import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import * as RecordActions from '../../actions/record-actions'
import * as ChatActions from '../../../chat/actions/chat-actions'
import appHistory from '../../../../utils/app-history'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Subheader from 'material-ui/Subheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"

import TeamInfoContainer from './teamInfo-container'

@connect((store, ownProps) => {
  return {
  };
})
class UserInfoContainer extends React.Component {
  render() {
    const info = this.props.info;
    const avatar = 'url(' + API_DOMAIN + 'public/upload/user/' + info.avatar + ')';

    return (
      <div class='userInfo'>
        {(info.avatar != undefined)?(
          <div class='avatarBox'>
            <div
              style ={{backgroundImage: avatar }}
              class='avatar'
             >
            </div>
          </div>
          ): ''}
        <div class='listInfo'>
          <div>
            <h3>{info.nickname}</h3>
          </div>
          <div>
            {info.name}
          </div>

          <div>
            {(info.city)? (
            <span>
              {info.city}
            </span>
            ): ('')}

            {(info.city && info.country)? (
             ', '
            ): ('')}

            {(info.country)? (
            <span>
              {info.country}
            </span>
            ): ('')}
          </div>

          <div>
            {(info.team)? (
              <Link to={`/team/${info.team}`}>
                <TeamInfoContainer id={info.team} />
              </Link>
            ): ''}
          </div>

        </div>
          
      </div>
    )
  }
};

export default UserInfoContainer;
