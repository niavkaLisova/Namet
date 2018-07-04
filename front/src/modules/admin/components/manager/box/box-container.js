import React from 'react'
import { connect } from 'react-redux'

import * as AdminActions from '../../../actions/admin-actions'
import BoxUserContainer from './boxUser-container'
import BoxShowContainer from '../boxShow-container'
import BoxBlackListContainer from './boxBlackList-container'

@connect((store, ownProps) => {
  	return {
  		listUser: store.adminN.listUser
  	};
})
class BoxContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: 1
		}
	}

	showBox = value => {
		this.setState({show: value})
	}

	render() {
		return (
		  	<div>
		  		<BoxShowContainer
		  			showBox={this.showBox}
		  		/>

				{(this.state.show == 0)? '': ''}
				{(this.state.show == 1)? (
					<BoxUserContainer />
		  		): ''}
				{(this.state.show == 2)? (
				<BoxBlackListContainer />): ''}
		  	</div>
		)
	}
}

export default BoxContainer