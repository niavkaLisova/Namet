import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ListContainer from './list-container'
import MessageContainer from './message-container'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      chat: store.chat.room
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
				    	<MessageContainer />
					</Col>
			  	</Row>
			</Container>
		)
	}
}