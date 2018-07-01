import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Admin from './admin-container'
import SelectContainer from './select-container'

import { Container, Row, Col } from 'react-grid-system'

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
export default class MenuContainer extends React.Component {
	render() {
		return (
			<div>
				{(this.props.user.email == 'admino')? (
			  	<Admin>
				    <Container>
				      <Row>
				      	<Col sm={8}>
				      		<SelectContainer />
				      	</Col>
				      	<Col sm={4}>
				      		List junior admin
				      	</Col>
				      </Row>
				    </Container>
			    </Admin>
			    ): (<Redirect to='/admin'  />)}
		    </div>
		)
	}
}