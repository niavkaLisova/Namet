import React from 'react'
import * as UserActions from '../../../user/actions/user-actions'
import * as GameActions from '../../actions/game-actions'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
import { Link } from 'react-router-dom'

import RecordContainer from './record-container'

@connect((store, ownProps) => {
  return {
    idGame: ownProps.match.params.idGame,
    game: store.game.game
  };
})
class GamePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(GameActions.findGameById(this.props.idGame))
    this.props.dispatch(GameActions.resultCount(this.props.idGame))
  }

  render() {
    const game = this.props.game;

    return (
      <div>
        <Link to='/game/home'>
          Game Home
        </Link>
        {(game && game.thema)? (
          <div>
            <h3 class='gameThemaLook'>{game.thema}</h3>
            {(game.status == 'active')? (
            (game.players[0])? (
              (Object.keys(game.players[0])).map(key => {
                return (
                  <RecordContainer
                    key={key}
                    idAuthor={key}
                    idRecord={game.players[0][key]}
                    idGame={game._id}
                   />
                )
              })
            ): 'No Records'
            ): (
              <div>Winers</div>
            )}
            
          </div>
        ): ''}
      </div>
    )
  }
};

export default GamePageContainer;
