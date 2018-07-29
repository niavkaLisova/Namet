import React from 'react'
import { connect } from "react-redux"
import * as UserActions from '../../actions/user-actions'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

@connect((store, ownProps) => {
  return {
  };
})
export default class NewCollectionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      titleError: '',
      describe: ''
    }
  }

  handleCloseColl = () => {
    this.setState({
      title: '',
      titleError: '',
      describe: ''
    })

    this.props.handleClose();
  }

  changeTitle = e => {
    this.setState({ title: e.target.value });
  }

  changeDescribe = e => {
    this.setState({ describe: e.target.value })
  }

  createCollection = () => {
    if (this.state.title.length > 0){
      this.setState({ 
        title: '',
        genre: ''
      });

      this.props.dispatch(UserActions.createCollection(this.state));
      this.props.handleClose();
    } else {
      this.setState({ titleError: 'Title is required' });
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create new Collection
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nameCollection"
              label="Name"
              type="text"
              value={this.state.title}
              onChange={this.changeTitle}
              fullWidth
            />
            <div class='error'>{this.state.titleError}</div>
            <TextField
              autoFocus
              margin="dense"
              multiline
              rowsMax="4"
              id="genreCollection"
              label="Describe"
              type="text"
              value={this.state.describe}
              onChange={this.changeDescribe}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseColl} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createCollection} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}