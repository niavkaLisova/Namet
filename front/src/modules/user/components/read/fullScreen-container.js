import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import { API_DOMAIN } from '../../../../utils/config.js'

import { connect } from "react-redux"
import Parser from 'html-react-parser'

@connect((store, ownProps) => {
  return {
  	id: ownProps.match.params.idRecord,
  	full: store.record.full
  };
})
class FullScreenContainer extends React.Component {
	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.findRecordById(this.props.id));
	}

	render() {
	    return (
	      <div>
	      	<h2>{this.props.full.title}</h2>
	      	{(this.props.full.img)? (
	        <img
	          class='recordThumbnail'
              alt={this.props.full.title}
              src={API_DOMAIN + 'public/upload/record/' + this.props.full.img}
            />
            ): ''}
	        <div>
	        	{Parser('' + this.props.full.text)}
	        </div>  
	      </div>
	    )
	}
};

export default FullScreenContainer;
