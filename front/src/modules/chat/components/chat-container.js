import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ListContainer from './list-container'
import BoxContainer from './box-container'
import { connect } from "react-redux"
import * as NotificationActions from '../../notification/actions/notification-actions'

@connect((store, ownProps) => {
    return {
    };
})
export default class ChatContainer extends React.Component {
	render() {
		return (
			<Container>
			  	<Row>
				    <Col sm={4}>
						<ListContainer />
				    </Col>
				    <Col sm={8}>
				    	<BoxContainer />
					</Col>
			  	</Row>
			</Container>
		)
	}
}


