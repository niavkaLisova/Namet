import React from 'react';

import TextareaContainer from './textarea-container'
import MessageContainer from './message-container'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class BoxChatContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MessageContainer />
        <TextareaContainer />
      </div>
    )
  }
};

export default BoxChatContainer;
