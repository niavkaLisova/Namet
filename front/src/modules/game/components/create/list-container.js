import React from 'react'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import * as GameActions from '../../actions/game-actions'
import EditModal from './editModal'

@connect((store, ownProps) => {
  return {
    gamesAuthor: store.game.gamesAuthor
  };
})
class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(GameActions.findByAuthor(localStorage.getItem('userId')));
  }

  render() {
    return (
      <div>
        <hr />
        {this.props.gamesAuthor.map(game => {
          return (
            <div key={game._id}>
              <h3>{game.thema}</h3>
              <div>{game.status}</div>
              <EditModal game={game}/>
            </div>
          )
        })}
      </div>
    )
  }
};

export default ListContainer;
