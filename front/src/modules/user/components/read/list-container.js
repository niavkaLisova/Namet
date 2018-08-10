import React from 'react'

import * as RecordActions from '../../actions/record-actions'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    collectionsList: store.record.collectionsList,
    recordsListNC: store.record.recordsListNC,
    recordsList: store.record.recordsList
  };
})
class ListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showList: true
		};
	}

	handleShow = () => {
		this.setState({ showList: !this.state.showList });
	}

	handleSelectCollection = coll => {
		if (localStorage.getItem('userId') == this.props.id) {
	      this.props.dispatch(RecordActions.findRecordsByCollId(coll._id));
	    } else {
	      this.props.dispatch(RecordActions.findRecordsByCollIdGuest(coll._id));
	    }
	}

	recordActive= record => {
		this.props.dispatch(RecordActions.setRecordActive(record));
		
		if (localStorage.getItem('userId') == this.props.id) {
			this.props.dispatch(RecordActions.updateRecordCreatedAt(record._id, this.props.id));
		} else {
			this.props.dispatch(RecordActions.setReview(record._id));
		}
	}

  	render() {
    
    return (
      	<div>
	        { this.props.collectionsList.map(coll => {
	        	return (
	        		<div key={coll._id} onClick={() => this.handleSelectCollection(coll)}>
	        			{coll.title}

	        			<div class='subList'>{(this.props.recordsList.length > 0 && this.props.recordsList[0].section == coll._id )? 
	        				(
	        					this.props.recordsList.map(record => {
						        	return (
						        		<div key={record._id} onClick={() => this.recordActive(record)}>
						        			{record.title}
						        		</div>
						        	)
						        })
				        	):
	        				''}</div>
	        			
	        		</div>
	        	)
	        }) }
	        <hr />
	        <p onClick={this.handleShow}>Records without collections</p>
	        { (this.state.showList)? ( this.props.recordsListNC.map(record => {
	        	return(
	        		<div key={record._id} onClick={() => this.recordActive(record)}>
	        			{record.title}
	        		</div>
	        	)
	        }) ): '' }
      	</div>
    	)
  	}
};

export default ListContainer;
