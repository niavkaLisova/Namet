import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import * as RecordActions from '../../actions/record-actions'
import appHistory from '../../../../utils/app-history'

import BoxChatContainer from './chat/boxChat-container'
import RecentlyRecordContainer from './recently/recentlyRecord-container'
import Button from '@material-ui/core/Button'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'
const classNames = require('classnames')

@connect((store, ownProps) => {
  return {
  };
})
class HomeLeftSidebarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: 'chat'
    }

    this.props.socket.emit('generalChat get messages b');
    this.props.socket.emit('join room', 'generalChat');
  }

  handleSwitch = name => {
    this.setState({ switch: name })

    if (name == 'chat') {
      this.props.socket.emit('scroll down b', 'generalChat');
    }
  }

  render() {
    const info = this.props.info;

    return (
      <div>
        <div>
          <div class='switchSidebar'>
            <div
              onClick={() => this.handleSwitch('chat')}
              className={classNames({
                'switch-active': this.state.switch == 'chat'
              })}
             >
              Chat
            </div>
            <div
              onClick={() => this.handleSwitch('recently')}
              className={classNames({
                'switch-active': this.state.switch == 'recently'
              })}
             >
              Recently
            </div>
          </div>
        </div>
        {(this.state.switch == 'chat')? (
          <BoxChatContainer id={this.props.id} />
        ): (
          <RecentlyRecordContainer id={this.props.id} />
        )}
      </div>
    )
  }
};

export default socketConnect(HomeLeftSidebarContainer);
