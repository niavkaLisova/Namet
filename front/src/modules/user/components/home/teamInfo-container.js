import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import * as TeamActions from '../../../team/actions/team-actions'
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

@connect((store, ownProps) => {
  return {
    infoTeam: store.team.infoTeam
  };
})
class TeamInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(TeamActions.findInfoTeam(this.props.id));
  }

  componentWillReceiveProps(nextProps){
    if (this.props.id != nextProps.id) {
      this.props.dispatch(TeamActions.findInfoTeam(nextProps.id));
    }
  }

  render() {
    return (
      <span>
        {(this.props.infoTeam)? (this.props.infoTeam.name): ''}
      </span>
    )
  }
};

export default TeamInfoContainer;
