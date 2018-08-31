import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'

import appHistory from '../../../utils/app-history'
import { connect } from "react-redux"

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

@connect((store, ownProps) => {
    return {
      user: store.user
    };
})
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    }
  }

  goToAdmin() {
    appHistory.push('/admin');
  }

  goToUser() {
    appHistory.push('/user/' + localStorage.getItem('userId'));
  }

  goToChat = () => {
    if (this.props.user.activeRoom) {
      appHistory.push('/chat/' + this.props.user.activeRoom);
    } else {
      appHistory.push('/chat');
    }
  }

  goToFollow() {
    appHistory.push('/follow/' + localStorage.getItem('userId'))
  }

  goToCollection() {
    appHistory.push('/collection');
  }

  goToSettings() {
    appHistory.push('/settings');
  }

  goToBudget() {
    appHistory.push('/budget/' + localStorage.getItem('userId'))
  }

  goToGame() {
    appHistory.push('/game/home');
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Menu List</ListSubheader>}
        >
          <ListItem button onClick={this.goToUser}>
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Home" />
          </ListItem>

          {(this.props.user.admin || this.props.user.email == 'admino')?(
            <ListItem button onClick={this.goToAdmin}>
              <ListItemIcon>
                <Icon>event_seat</Icon>
              </ListItemIcon>
              <ListItemText inset primary="Admin" />
            </ListItem>
          ): ('')}

          <ListItem button onClick={this.goToChat}>
            <ListItemIcon>
              <Icon>chat</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Chat" />
          </ListItem>

          <ListItem button onClick={this.goToFollow}>
            <ListItemIcon>
              <Icon>chat</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Follow" />
          </ListItem>

          <ListItem button onClick={this.goToCollection}>
            <ListItemIcon>
              <Icon>chat</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Collection" />
          </ListItem>

          <ListItem button onClick={this.goToSettings}>
            <ListItemIcon>
              <Icon>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </ListItem>

          <ListItem button onClick={this.goToBudget}>
            <ListItemIcon>
              <Icon>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Budget" />
          </ListItem>

          <ListItem button onClick={this.goToGame}>
            <ListItemIcon>
              <Icon>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText inset primary="Game" />
          </ListItem>
       
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(LeftMenu);
