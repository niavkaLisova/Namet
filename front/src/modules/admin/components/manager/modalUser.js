import React from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

class ModalUser extends React.Component {
  add = () => {
    this.props.setUser();
    this.props.handleClose();
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
         <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Select User"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.findUser.map(user => {
                return <span key={user._id} onClick={() => this.props.selectUser(user)}>{user.nickname}</span>
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.add} color="primary" autoFocus>
              Select
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default ModalUser;