import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import * as UserActions from '../actions/user-actions';
import appHistory from '../../../utils/app-history';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserFormContainer from './user-form-container';

import { connect } from "react-redux"
import { setActiveLanguage } from 'react-localize-redux';

@connect((store, ownProps) => {
  console.log('ownProps', ownProps);
    return {
      user: store.user,
      id: ownProps.match.params.id
    };
})
export default class UserContainer extends React.Component {
  updateUser() {
    this.props.dispatch(UserActions.updateUser(this.props.user));
  }

  onChangeEmail(event) {
    this.props.dispatch(UserActions.userDataUpdated({email: event.target.value}));
  }

  onChangeSurname(event) {
    this.props.dispatch(UserActions.userDataUpdated({surname: event.target.value}));
  }

  render() {
    const { user } = this.props;

    return (
      <MuiThemeProvider>
        <h1>ID {this.props.id}</h1>
        <UserFormContainer
          user={user}
          actionType={'edit'}
          updateUser={this.updateUser.bind(this)}
          onChangeEmail={this.onChangeEmail.bind(this)}
          onChangeSurname={this.onChangeSurname.bind(this)}
        />
      </MuiThemeProvider>
    )
  }
};

