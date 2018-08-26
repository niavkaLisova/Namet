import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import * as UserActions from '../../actions/user-actions'
import { API_DOMAIN, TEAM_LIST } from '../../../../utils/config.js'

import { connect } from "react-redux"
import Parser from 'html-react-parser'

import CoinInfoContainer from './coinInfo-container'

@connect((store, ownProps) => {
  return {
  	id: ownProps.match.params.idRecord,
  	full: store.record.full,
  	team: store.user.team,
  	coin: store.user.coin,
  	myTeam: store.record.myTeam
  };
})
class FullScreenContainer extends React.Component {
	componentDidMount() {
		let timer = setInterval(() => {
			if (this.props.team) {
				clearInterval(timer);
				this.props.dispatch(RecordActions.getTeamById(this.props.team));
			}
		}, 500)
	}

	constructor(props) {
		super(props);

		this.props.dispatch(RecordActions.findRecordById(this.props.id));
	}

	sendPoint = () => {
		if (this.props.coin.neutral > 0) {
			let index = null;
			Object.keys(TEAM_LIST).map(key => {
				if (TEAM_LIST[key] == this.props.myTeam.name) {
					index = key;
				}
			})

			this.props.dispatch(RecordActions.sendPoint(this.props.full._id, index));
		}
	}

	render() {
		let coin = this.props.full.coin;

	    return (
	      <div>
	      	<h2>{this.props.full.title}</h2>
	      	{(this.props.full.author != localStorage.getItem('userId'))?
	      		(	
	      			<p onClick={this.sendPoint}>Send Points</p>
	      		):
	      	''}
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
	        {(!coin)? '' : (
	        	<CoinInfoContainer coin={coin} />
	        )}
	      </div>
	    )
	}
};

export default FullScreenContainer;
