import React from 'react';

import * as UserActions from '../../actions/user-actions'
import { API_DOMAIN } from '../../../../utils/config.js'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"

import Avatar from '@material-ui/core/Avatar'

@connect((store, ownProps) => {
  return {
  };
})
export default class JoinTeamContainer extends React.Component {  
  joinTeam = id => {
    this.props.dispatch(UserActions.setTeam(id));
    appHistory.push('/user');
  }

  render() {
    return (
      <div style={{backgroundColor: this.props.team.color}}>
        <h3>{this.props.team.name} -  points</h3>
        <div>Some descibe</div>
        <Avatar 
          alt='team'
          src = {API_DOMAIN + 'public/upload/team/' + this.props.team.emblem}
        />
        <div onClick={() => this.joinTeam(this.props.team._id)}>Join</div>
      </div>
    )
  }
};

