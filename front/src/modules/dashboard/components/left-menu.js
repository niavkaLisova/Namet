import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import appHistory from '../../../utils/app-history'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      user: store.user
    };
})
export default class LeftMenu extends React.Component {
  goToAdmin() {
    appHistory.push('/admin');
  }

  goToUser() {
    appHistory.push('/user/' + localStorage.getItem('userId'));
  }

  goToChat() {
    appHistory.push('/chat');
  }

  render() {
    return (
      <MuiThemeProvider>
        <List>        
          <Subheader>Menu description</Subheader>
          <ListItem primaryText="User" leftIcon={<ContentSend />} onClick={this.goToUser.bind(this)}/>
          <ListItem primaryText="Admin" leftIcon={<ContentDrafts />} onClick={this.goToAdmin}/>
          <ListItem primaryText="Chat" leftIcon={<ContentDrafts />} onClick={this.goToChat}/>
        </List>
      </MuiThemeProvider>
    )
  }
};
