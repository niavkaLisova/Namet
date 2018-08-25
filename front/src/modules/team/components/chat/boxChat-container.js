import React from 'react';

import TextareaContainer from './textarea-container'
import MessageContainer from './message-container'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class BoxChatContainer extends React.Component {
  render() {
    return (
      <div>
        <MessageContainer />
        {(localStorage.getItem('userId'))? (
          <TextareaContainer idTeam={this.props.idTeam} />
        ): ''}
      </div>
    )
  }
};

export default BoxChatContainer;
