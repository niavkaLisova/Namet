import React from 'react'

import * as RecordActions from '../../actions/record-actions'

import TextField from '@material-ui/core/TextField'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  	searchList: store.record.searchList
  };
})
class SearchContainer extends React.Component {
  	constructor(props) {
  		super(props);

  		this.state = {
  			search: ''
  		}
  	}

  	handleChangeSearch = e => {
  		this.setState({ search: e.target.value });

  		if (e.target.value.length > 0) {
        if (localStorage.getItem('userId') == this.props.id) {
          this.props.dispatch(RecordActions.searchRecord(e.target.value, this.props.id));
        } else {
          this.props.dispatch(RecordActions.searchRecordGuest(e.target.value, this.props.id));
        }
  		} else {
  			this.props.dispatch(RecordActions.setSearch([]));
  		}
  	}

  	render() {
	    return (
	     	<div>
		        <TextField
		          id="search"
		          label="Search field"
		          type="search"
		          margin="normal"
		          value={this.state.search}
              fullWidth
		          onChange={this.handleChangeSearch}
		        />

		        {this.props.searchList.map(item => {
		        	return (
		        		<div key={item._id}>
		        			{item.title}
		        		</div>
		        		)
		        })}
	      	</div>
	    )
  	}
};

export default SearchContainer;
