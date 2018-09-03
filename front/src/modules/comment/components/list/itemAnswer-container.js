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

@connect((store, ownProps) => {
  return {
    info: store.comment.info
  };
})
class ItemAnswerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }

    this.props.dispatch(CommentActions.findUserById(this.props.comment.author));
  }

  clearComment = () => {
    this.setState({ visible: false });
    this.props.dispatch(CommentActions.clearComment(this.props.comment._id))
  }

  render() {
    let info= this.props.info[this.props.comment.author]
    
    return (
      <div>
      {(info)? (
        <div>
          {(this.state.visible)? (
          <div class='comment answerComment'>
            <IntlProvider locale="en">
              <InfoContainer
                comment={this.props.comment}
                info={info}
                clearComment={this.clearComment}
                idComment={this.props.comment._id}
                show={false}
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
          </div>
          ): ''}
        </div>
      ): ''}
      </div>
    )
  }
};

export default socketConnect(ItemAnswerContainer);
