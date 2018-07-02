import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'

import appHistory from '../../../utils/app-history'
import * as UserActions from '../../user/actions/user-actions'
import Admin from './admin-container'
import SelectContainer from './junior/select-container'
import ListJuniorContainer from './junior/listJunior-container'
import Paper from '@material-ui/core/Paper'

import { Container, Row, Col } from 'react-grid-system'

@connect((store, ownProps) => {
  	return {
    	user: store.user
  	};
})
class AdminJuniorContainer extends React.Component {
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
				    <Container>
				      <Row>
				      	<Col sm={8}>
				      		<SelectContainer />
				      	</Col>
				      	<Col sm={4}>
				      		<ListJuniorContainer />
				      	</Col>
				      </Row>
				    </Container>
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

export default socketConnect(AdminJuniorContainer);