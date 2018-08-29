import React from 'react'

import * as CommentActions from '../../actions/comment-actions'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
  return {
  };
})
class CommentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSend = () => {
    console.log('send', this.state.text, this.props.idRecord);

    this.setState({ text: '' });
    this.props.dispatch(CommentActions.sendComment(this.state.text, this.props.idRecord));
  }

  render() {
    return (
      <div class='textareaBox'>
        <div>
          <TextField
            label="Comment"
            multiline
            rowsMax="4"
            value={this.state.text}
            onChange={this.handleChange}
            margin="normal"
            class='textarea'
          />
        </div>
        <div>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.handleSend}
            class='butSend'
           >
            Send
          </Button>
        </div>
      </div>
    )
  }
};

export default socketConnect(CommentContainer);
