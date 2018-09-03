import React from 'react'

import * as CommentActions from '../../actions/comment-actions'
import appHistory from '../../../../utils/app-history'
import { API_DOMAIN } from '../../../../utils/config'

import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
import { IntlProvider } from 'react-intl'

import InfoContainer from './info-container'
import AvatarContainer from './avatar-container'
import ListAnswerContainer from'./listAnswer-container'
import CommentContainer from '../box/comment-container'

@connect((store, ownProps) => {
  return {
    info: store.comment.info,
    answer: store.comment.answer,
    answerer: store.comment.idAnswerer
  };
})
class ItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }

    this.props.dispatch(CommentActions.findUserById(this.props.comment.author));
    this.props.dispatch(CommentActions.findAnswerByComment(this.props.comment._id))
  }

  clearComment = (comment) => {
    this.setState({ visible: false });
    this.props.dispatch(CommentActions.clearComment(comment))
  }

  render() {
    let info= this.props.info[this.props.comment.author]
    
    return (
      <div>
        {(info)? (
        <div>
          {(this.state.visible)? (
          <div>
            <div class='comment'>
              <IntlProvider locale="en">
                <InfoContainer
                  comment={this.props.comment}
                  info={info}
                  clearComment={this.clearComment}
                  idComment={this.props.comment._id}
                  show={true}
                 />
              </IntlProvider>
              <div class='item distance'>
                {(info.avatar)? (
                  <AvatarContainer
                    avatar={info.avatar}
                    idAuthor={info._id}
                   />
                ): ''}
                <div class='text'>{this.props.comment.text}</div>
              </div>

              {(this.props.answerer && this.props.answerer == this.props.comment._id)? (
                <div>
                  <CommentContainer />
                </div>
              ): ''}
            
              {(this.props.answer[this.props.comment._id])? (
                <ListAnswerContainer
                  answers={this.props.answer[this.props.comment._id]}
                  clearComment={this.clearComment}
                 />
              ): ''}
            </div>
          </div>
          ): ''}
        </div>
        ): ''}
      </div>
    )
  }
};

export default socketConnect(ItemContainer);
