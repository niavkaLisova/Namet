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
    gamesAll: store.game.gamesAll,
    admin: store.user.admin,
    email: store.user.email
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
        {(this.props.admin || this.props.email =='admino')? (
          <Link to='/game/create'>
            Create
          </Link>
        ): ''}
        {this.props.gamesAll.map(game => {
          return (
            <div key={game._id}>
              <h3>{game.thema}</h3>
              <Link to={`/game/join/${game._id}`}>
                Join
              </Link>
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
            </div>
          )
        })}
      </div>
    )
  }
};

export default GameContainer;
