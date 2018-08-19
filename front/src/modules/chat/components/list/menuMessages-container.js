import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import Icon from '@material-ui/core/Icon'

class MenuMessagesContainer extends React.Component {
	state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDeleteAllMHere = () => {
		this.handleClose();
		this.props.handleDeleteAllM();
	}

	handleDeleteRoomHere = () => {
		this.handleClose();
		this.props.handleDeleteRoom();
	}

  render() {
  	const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-owns={open ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Icon>more_vert</Icon>
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleDeleteAllMHere}>Delete all messeges</MenuItem>
	          <MenuItem onClick={this.handleDeleteRoomHere}>Delete chat</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MenuMessagesContainer;
