import React from 'react'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import GameCreateContainer from './gameCreate-container'
import ListContainer from './list-container'

import '../Game.sass'

@connect((store, ownProps) => {
  return {
    admin: store.user.admin
  };
})
class GameCreateBoxContainer extends React.Component {
  render() {
    return (
      <div>
        {(this.props.admin.length == 'undefined' && this.props.admin == false)?
        (<Redirect to='/game/home' />):(
        <div class='boxGame'>
          <GameCreateContainer />
          <ListContainer />
        </div>
        )}
      </div>
    )
  }
};

export default GameCreateBoxContainer;
