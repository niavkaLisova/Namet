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
class ItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(CommentActions.findUserById(this.props.comment.author));
  }

  render() {
    return (
      <div class='comment'>
        <IntlProvider locale="en">
          <InfoContainer
            comment={this.props.comment}
            info={this.props.info}
           />
        </IntlProvider>
        <div class='item distance'>
          {(this.props.info.avatar)? (
            <AvatarContainer
              avatar={this.props.info.avatar}
              alt={this.props.info.name}
             />
          ): ''}
          <div class='text'>{this.props.comment.text}</div>
        </div>
      </div>
    )
  }
};

export default socketConnect(ItemContainer);
