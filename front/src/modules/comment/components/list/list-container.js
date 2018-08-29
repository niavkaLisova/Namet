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

    this.state = {
      limit: 6
    }

    this.props.dispatch(CommentActions.findCommentByRecord(this.props.idRecord));
  }

  moreComments = () => {
    this.setState({ limit: this.state.limit + 6 })
  }

  render() {
    return (
      <div>
        {(this.props.comments.slice(0, this.state.limit).map(comment => {
          return (
            <ItemContainer
              key={comment._id}
              comment={comment}
             />
          )
        }))}
         {(this.props.comments.length - this.state.limit > 0)? (
        <div
          onClick={this.moreComments}
         >
          More Comments
        </div>
        ): ''}
      </div>
    )
  }
};

export default socketConnect(ListContainer);
