import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'

import { connect } from "react-redux"
import * as GameActions from '../../actions/game-actions'

@connect((store, ownProps) => {
  return {
  };
})
class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      thema: this.props.game.thema,
      status: this.props.game.status
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeThema = e => {
    this.setState({ thema: e.target.value })
  } 

  handleChangeStatus = e => {
    this.setState({ status: e.target.value })
  }

  handleEdit = () => {
    const id = this.props.game._id;
    
    this.props.dispatch(GameActions.updateGame(
      id,
      this.state.thema,
      this.state.status
    ));
    this.handleClose();
  }

  handleDelete = () => {
    this.props.dispatch(GameActions.deleteGame(this.props.game._id))
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div>Edit {this.props.game.thema}</div>
          </DialogTitle>
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleEdit}
            >

              <TextValidator
                label='Thema'
                onChange={this.handleChangeThema}
                value={this.state.thema}
                name='thema'
                validators={['required']}
                errorMessages={['this field is required']}
              />

              <Select
                native
                value={this.state.status}
                onChange={this.handleChangeStatus}
                inputProps={{
                  name: 'status',
                  id: 'status-native-simple',
                }}
              >
                <option value='active'>active</option>
                <option value='disabled'>disabled</option>
              </Select>

              <Button
                variant="contained"
                color="primary"
                type="submit"
               > Update
              </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              delete
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditModal;