import React from 'react'
import { socketConnect } from 'socket.io-react'

import * as TeamActions from '../actions/team-actions'
import appHistory from '../../../utils/app-history'

import { Container, Row, Col } from 'react-grid-system'

import MainContainer from './main/main-container'
import AdminContainer from './main/admin-container'
import RecordContainer from './recently/record-container'
import BoxChatContainer from './chat/boxChat-container'

import { connect } from "react-redux"

import './Team.sass'

@connect((store, ownProps) => {
  return {
  	idTeam: ownProps.match.params.idTeam,
  	userTeam: store.user.team,
  	infoTeam: store.team.infoTeam,
  };
})
class TeamPageContainer extends React.Component {
	constructor(props) {
  	super(props);

  	this.handle();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.idTeam != this.props.idTeam) {
			if (localStorage.getItem('userId')) {
				this.props.socket.emit('leave room', prevProps.idTeam);
			}

			this.handle();
		}
	}

	handle = () => {
		if (this.props.idTeam) {
  		this.props.dispatch(TeamActions.findRecordsByTeam(this.props.idTeam));
  		this.props.socket.emit('teamChat get messages b', this.props.idTeam);
  		
  		this.props.dispatch(TeamActions.findInfoTeam(this.props.idTeam))
  		this.props.dispatch(TeamActions.findAdminTeam(this.props.idTeam));

  		if (localStorage.getItem('userId')) {
  			this.props.socket.emit('join room', this.props.idTeam);
  		}
  	}
	}

	render() {
		return (
			<Container fluid>
				<Row>
					<Col md={6}>
						<MainContainer />
						<hr />
						<AdminContainer />
					</Col>
					<Col md={3}>
						<RecordContainer />
					</Col>
					<Col md={3}>
						<BoxChatContainer idTeam={this.props.idTeam} />
					</Col>
				</Row>
			</Container>
		)
	}
}

export default socketConnect(TeamPageContainer);
