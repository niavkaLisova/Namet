import React from 'react'

import * as RecordActions from '../../actions/record-actions'
import { API_DOMAIN, TEAM_LIST } from '../../../../utils/config.js'

import { connect } from "react-redux"
import PointDisplayContainer from './pointDisplay-container'

@connect((store, ownProps) => {
  return {
  };
})
class CoinInfoContainer extends React.Component {
	render() {
		let coin = this.props.coin;

	    return (
	      <div class='coinBox'>
	      	{Object.keys(coin).map((point, index) => {
	      		return (
	      			<PointDisplayContainer 
	      				key={index}
	      				point={TEAM_LIST[point]}
	      				index={index}
	      				count={coin[point]}
	      			 />
	      		)
	      	})}
	      </div>
	    )
	}
};

export default CoinInfoContainer;
