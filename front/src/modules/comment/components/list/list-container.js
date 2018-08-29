import React from 'react'

import * as CommentActions from '../../actions/comment-actions'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import ItemContainer from './item-container'

@connect((store, ownProps) => {
  return {
    comments: store.comment.comments
  };
})
class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(CommentActions.findCommentByRecord(this.props.idRecord));
  }

  render() {
    return (
      <div>
        {(this.props.comments.map(comment => {
          return (
            <ItemContainer
              key={comment._id}
              comment={comment}
             />
          )
        }))}
      </div>
    )
  }
};

export default socketConnect(ListContainer);
