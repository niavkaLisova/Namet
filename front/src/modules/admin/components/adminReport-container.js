import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'

import appHistory from '../../../utils/app-history'
import * as AdminActions from '../actions/admin-actions'
import * as UserActions from '../../user/actions/user-actions'
import Admin from './admin-container'
import EnhancedTable from './report/table-container'

import { Container, Row, Col } from 'react-grid-system'

@connect((store, ownProps) => {
  	return {
    	user: store.user
  	};
})
class AdminReportContainer extends React.Component {
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
				      	<Col md={12}>
				      		<EnhancedTable />
				      	</Col>
				      </Row>
				    </div>
			    </Admin>
			    ): (
			    	setTimeout(() =>{
					        if(this.props.user.email != 'admino')
					        	appHistory.push('/admin');
					    }, 1000
					)
			    ))}
		    </div>
		)
	}
}

export default socketConnect(AdminReportContainer);