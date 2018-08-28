import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import { API_DOMAIN, TEAM_LIST } from '../../../../utils/config.js'
import {ToastContainer, ToastStore} from 'react-toasts'

import { connect } from "react-redux"
import Parser from 'html-react-parser'

import PointBoxContainer from './pointBox-container'

@connect((store, ownProps) => {
  return {
  	id: ownProps.match.params.idRecord,
  	full: store.record.full,
  	team: store.user.team,
  	coin: store.user.coin,
  };
})
class FullScreenContainer extends React.Component {
	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.findRecordById(this.props.id));
	}

	render() {
		let coin = this.props.full.coin;

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
	        <PointBoxContainer />
	      </div>
	    )
	}
};

export default FullScreenContainer;
