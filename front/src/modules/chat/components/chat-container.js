import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ListContainer from './list-container'
import BoxContainer from './box-container'
import { connect } from "react-redux"
import * as NotificationActions from '../../notification/actions/notification-actions'
import { Redirect } from 'react-router-dom'

@connect((store, ownProps) => {
    return {
    };
})
export default class ChatContainer extends React.Component {
	render() {
		return (
			<Container fluid>
				{(localStorage.getItem('userId'))? (
			  	<Row>
				    <Col sm={4}>
						<ListContainer />
				    </Col>
				    <Col sm={8}>
				    	<BoxContainer />
					</Col>
			  	</Row>
			  	) : (<Redirect to='/login' />) }
			</Container>
		)
	}
}


