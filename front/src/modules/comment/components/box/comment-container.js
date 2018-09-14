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
    answerer: store.comment.idAnswerer
  };
})
class CommentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!(this.state.text.includes(this.props.text))) {
      this.setState({ text: this.props.text + ', ' + this.state.text })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSend = () => {
    if (this.state.text.length > 0) {

      this.setState({ text: '' });
      this.props.dispatch(CommentActions.setIdAnswerer(null));
      this.props.dispatch(CommentActions.sendComment(
        this.state.text,
        this.props.idRecord,
        this.props.answerer
      ));
    }
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
