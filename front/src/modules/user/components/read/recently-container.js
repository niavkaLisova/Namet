import React from 'react'

import * as RecordActions from '../../actions/record-actions'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    topRecords: store.record.topRecords,
  };
})
class RecentlyContainer extends React.Component {
	recordActive = record => {
		if (record.author != localStorage.getItem('userId')) {
	    	this.props.dispatch(RecordActions.setReview(record._id));
	    }
		this.props.dispatch(RecordActions.setRecordActive(record));
	}

	render() {
	    return (
	      <div>
	      	{ this.props.topRecords.map(record => {
	      		return (
	      			<div key={record._id} onClick={() => this.recordActive(record)}>
	      				{record.title}
	      			</div>
	      		)
	      	}) }
	      	<hr />
	      </div>
	    )
	}
};

export default RecentlyContainer;
