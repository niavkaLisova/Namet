import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'

import appHistory from '../../../utils/app-history'
import * as UserActions from '../../user/actions/user-actions'
import Admin from './admin-container'
import ListTeamContainer from './team/listTeam-container'
import CreateTeamContainer from './team/createTeam-container'

import Paper from '@material-ui/core/Paper'

import { Container, Row, Col } from 'react-grid-system'

@connect((store, ownProps) => {
  	return {
    	user: store.user
  	};
})
class TeamContainer extends React.Component {
	constructor(props) {
    	super(props);

		this.props.dispatch(UserActions.getUser(this.props.socket))
	}
	
	render() {
		return (
			<div>
			{(this.props.user.email == undefined)? (<Redirect to='/admin'  />): (
				(this.props.user.email == 'admino')? (
			  	<Admin>
				    <div>
				      <Row>
				      	<Col md={8}>
				      		<ListTeamContainer />
				      	</Col>
				      	<Col md={4}>
				      		<CreateTeamContainer />
				      	</Col>
				      </Row>
				    </div>
			    </Admin>
			    ): (
			    	setTimeout(() =>{
					        if(this.props.user.email != 'admino')
					        	appHistory.push('/user');
					    }, 1000
					)
			    ))}
		    </div>
		)
	}
}

export default socketConnect(TeamContainer);