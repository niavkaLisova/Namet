import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import { API_DOMAIN, TEAM_LIST_REVERSE } from '../../../../utils/config.js'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  	teamInfo: store.record.teamInfo
  };
})
class PointDisplayContainer extends React.Component {
	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.getTeamByTitle(this.props.point, this.props.count, TEAM_LIST_REVERSE[this.props.point]));
	}

  componentDidUpdate(prevProps) {
    if (prevProps.count != this.props.count) {
      this.props.dispatch(RecordActions.getTeamByTitle(this.props.point, this.props.count, TEAM_LIST_REVERSE[this.props.point]));
    }
  }

	render() {
		const point = this.props.point;

    return (
      <div>
      	 {(this.props.teamInfo[this.props.index])? 
          (
            <div>
              {((this.props.teamInfo[this.props.index]).doc.point)? (
              <img 
                class='coinImg'
                src={API_DOMAIN + 'public/upload/team/' +(this.props.teamInfo[this.props.index]).doc.point} 
               />
              ): ''}
              <span>{this.props.teamInfo[this.props.index].doc.count}</span>
            </div>
          ):
          ''}
      </div>
    )
	}
};

export default PointDisplayContainer;
