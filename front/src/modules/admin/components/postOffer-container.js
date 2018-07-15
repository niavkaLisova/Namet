import React from 'react'
import { connect } from 'react-redux'
import { socketConnect } from 'socket.io-react'

import appHistory from '../../../utils/app-history'
import * as UserActions from '../../user/actions/user-actions'
import Admin from './admin-container'

import Paper from '@material-ui/core/Paper'
import { Container, Row, Col } from 'react-grid-system'

export default class PostOfferContainer extends React.Component {
	render() {
		return (
		  	<Admin>
			    <div>
			      <Row>
			      	<Col md={8}>
			      		Offer important post
			      	</Col>
			      </Row>
			    </div>
		    </Admin>
		)
	}
}