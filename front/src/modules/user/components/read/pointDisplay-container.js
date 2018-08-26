import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import { API_DOMAIN } from '../../../../utils/config.js'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  	teamInfo: store.record.teamInfo
  };
})
class PointDisplayContainer extends React.Component {
	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.getTeamByTitle(this.props.point));
	}

	render() {
		const point = this.props.point;

    return (
      <div>
      	{(this.props.teamInfo[this.props.index])? 
      		(
      			<div>
      				<img 
      					class='coinImg'
      					src={API_DOMAIN + 'public/upload/team/' +(this.props.teamInfo[this.props.index]).point} 
      				 />
      				<span>{this.props.count}</span>
      			</div>
      		):
      		'nie'}
      </div>
    )
	}
};

export default PointDisplayContainer;
