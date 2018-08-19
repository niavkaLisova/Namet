import React from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import UserCardContainer from './userCard-container'

export default class FindUserDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            {this.props.findUser.map((user) => 
              <p key={user._id} onClick={() => this.props.setUserAdd(user)}>{user.nickname}</p>
            )}
            
            <hr />
            {this.props.findUser.map((user) => 
              <UserCardContainer
                key={user._id} 
                user={user}
                handle={this.props.setUserAdd}
               />
            )}
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.props.handleClose}
              color="primary"
             >
              Disagree
            </Button>
            <Button 
              onClick={this.props.userAddFunc}
              color="primary" 
              autoFocus
             >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
