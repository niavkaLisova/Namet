import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import { API_DOMAIN, TEAM_LIST } from '../../../../utils/config.js'
import {ToastContainer, ToastStore} from 'react-toasts'

import { connect } from "react-redux"
import Parser from 'html-react-parser'

import PointBoxContainer from './pointBox-container'
import BoxContainer from '../../../comment/components/box-container'
import DecisionContainer from '../../../decision/decision-container'

@connect((store, ownProps) => {
  return {
  	id: ownProps.match.params.idRecord,
  	full: store.record.full,
  	team: store.user.team
  };
})
class FullScreenContainer extends React.Component {
	componentDidMount() {
		let timer = setInterval(() => {
			if (this.props.full && this.props.full.author) {
				clearInterval(timer);

				if (localStorage.getItem('userId') == this.props.full.author) {
					this.props.dispatch(RecordActions.updateRecordCreatedAt(this.props.full._id, this.props.author));
				} else {
					this.props.dispatch(RecordActions.setReview(this.props.full._id));
				}
			}
		}, 500)
	}

	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.findRecordById(this.props.id));
	}

	render() {
    return (
      <div>
      	{(this.props.full)? (
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
	        <DecisionContainer record={this.props.full} />
	        <PointBoxContainer />
	        <BoxContainer idRecord={this.props.id} />
	      </div>
	      ): ''}
      </div>
    )
	}
};

export default FullScreenContainer;
