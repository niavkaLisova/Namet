import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
export default class SelectTeam extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(UserActions.getTeamByTitle(this.props.title, this.props.index, this.props.points));
  }
 
  render() {
    return (
      <div>
      </div>
    )
  }
};

