import React from 'react'
import { Container, Row, Col } from 'react-grid-system'

export default class ReadContainer extends React.Component {
	render() {
		return (
			<Container>
			  	<Row>
				    <Col sm={8}>
						{(this.props.value['read'])? 'read': 'not read'}
				    
				    </Col>
				    <Col sm={4}>
					</Col>
			  	</Row>
			</Container>
		)
	}
}


