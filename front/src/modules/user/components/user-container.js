import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import appHistory from '../../../utils/app-history'

import { List, ListItem } from 'material-ui/List'
import Avatar from '@material-ui/core/Avatar'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserFormContainer from './user-form-container'

import { connect } from "react-redux"
import { setActiveLanguage } from 'react-localize-redux'

@connect((store, ownProps) => {
  return {
    user: store.user,
    id: ownProps.match.params.id
  };
})
export default class UserContainer extends React.Component {
  constructor(props) {
    super(props)

    if(!this.props.id) appHistory.push('/user/' + localStorage.getItem('userId'));

  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>Conatiner {this.props.id}</h2>
         {(this.props.user.avatar != undefined)?(
           <Avatar
            alt={this.props.user.nickname}
            src={API_DOMAIN + 'public/upload/user/' + this.props.user.avatar}
          />
        ): ''}
      </div>
    )
  }
};

