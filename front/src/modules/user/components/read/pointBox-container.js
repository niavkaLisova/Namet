import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import { API_DOMAIN, TEAM_LIST } from '../../../../utils/config.js'
import {ToastContainer, ToastStore} from 'react-toasts'

import { connect } from "react-redux"

import CoinInfoContainer from './coinInfo-container'

@connect((store, ownProps) => {
  return {
  	full: store.record.full,
  	team: store.user.team,
  	coin: store.user.coin,
  	myTeam: store.record.myTeam
  };
})
class PointBoxContainer extends React.Component {
	componentDidMount() {
		let timer = setInterval(() => {
			if (this.props.team) {
				clearInterval(timer);
				this.props.dispatch(RecordActions.getTeamById(this.props.team));
			}
		}, 500)
	}

	sendPoint = () => {
		if (this.props.coin.neutral > 0) {
			let random = Math.floor(Math.random() * 7);
			let index = null;

			if (this.props.team) {
				Object.keys(TEAM_LIST).map(key => {
					if (TEAM_LIST[key] == this.props.myTeam.name) {
						index = key;
					}
				})
			} else {
				index = Object.keys(TEAM_LIST)[random];
			}

			this.props.dispatch(RecordActions.takePoint(this.props.full._id, this.props.full.author, index));
		} else {
			ToastStore.error('you have no neutral point');
		}
	}

	render() {
		let coin = (this.props.full)? (this.props.full.coin): this.props.coin;

	    return (
	    	<div>
	    		{(this.props.full)? (
		      <div>
		      	{(this.props.full.author != localStorage.getItem('userId'))?
		      		(	
		      			<p onClick={this.sendPoint}>Send Point</p>
		      		):
		      	''}
		        {(!coin)? '' : (
		        	<CoinInfoContainer coin={coin} />
		        )}
		      </div>
		      ): ''}
	      </div>
	    )
	}
};

export default PointBoxContainer;
