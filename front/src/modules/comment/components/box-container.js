import React from 'react'

import * as CommentActions from '../actions/comment-actions'
import appHistory from '../../../utils/app-history'

import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import CommentContainer from './box/comment-container'
import ListContainer from './list/list-container'

import './Comment.sass'

@connect((store, ownProps) => {
  return {
  };
})
class BoxContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='commentBox'>
        <CommentContainer idRecord={this.props.idRecord} />
        <ListContainer idRecord={this.props.idRecord} />
      </div>
    )
  }
};

export default socketConnect(BoxContainer);
