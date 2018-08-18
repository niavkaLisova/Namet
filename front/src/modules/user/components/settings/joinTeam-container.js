import React from 'react';

import * as UserActions from '../../actions/user-actions'
import { API_DOMAIN } from '../../../../utils/config.js'
import appHistory from '../../../../utils/app-history'
import Button from '@material-ui/core/Button';
const classNames = require('classnames')

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

  handleSetActive = () => {
    this.props.hansleActiveTeam(this.props.team);
  }

  render() {
    const color = this.props.team.color.split(',');
    const rgb = color[0] + ', ' + color[1] + ', ' + color[2] + ', 1)';
    const rgba = color[0] + ', ' + color[1] + ', ' + color[2] + ', 0.3)';

    return (
      <div 
      onClick={this.handleSetActive}
      class={classNames({
        team: true,
        'teamActive': (this.props.active == this.props.team.index),
        })} 
      style={{backgroundColor: this.props.team.color, order: this.props.team.index, borderColor: rgb}}>
        <h3>{this.props.team.name} - {this.props.team.points} points</h3>
        <div>
          <img 
            class='imgTeam'
            style={{borderColor: rgba}}
            alt='team'
            src = {API_DOMAIN + 'public/upload/team/' + this.props.team.emblem}
          />
        </div>
        <div>
          <Button 
            variant="contained"
            onClick={() => this.joinTeam(this.props.team._id)}
            >
            Join
          </Button>
        </div>
      </div>
    )
  }
};

