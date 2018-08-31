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
    gamesAll: store.game.gamesAll
  };
})
class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(GameActions.findGameAll())
  }

  render() {
    return (
      <div>
        {this.props.gamesAll.map(game => {
          return (
            <div key={game._id}>
              <h3>{game.thema}</h3>
              {(Object.keys(game.players[0])).map(key => {
                return (
                  <RecordContainer
                    key={key}
                    idAuthor={key}
                    idRecord={game.players[0][key]}
                    idGame={game._id}
                   />
                )
              })}
              <Link to={`/game/join/${game._id}`}>
                Join
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
};

export default GameContainer;
