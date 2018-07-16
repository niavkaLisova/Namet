import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

class ModalTeam extends React.Component {
  	render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Edit Team</DialogTitle>
          <DialogContent>
              
              <ValidatorForm
                ref="form"
                onSubmit={this.props.handleSubmit}
            >
                <div>Simple form</div>
                <TextValidator
                    label="Name"
                    onChange={this.props.handleChange}
                    name="name"
                    value={this.props.team.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    label="Color"
                    onChange={this.props.handleChange}
                    name="color"
                    value={this.props.team.color}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button
                    type="submit"
                    disabled={this.props.submitted}
                >
                    {
                        (this.props.submitted && 'Your form is submitted!')
                        || (!this.props.submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ModalTeam;