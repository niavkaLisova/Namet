import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as ChatActions from '../actions/chat-actions'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem2 from 'material-ui/MenuItem'
import Icon from '@material-ui/core/Icon'

import './Message.sass';
const ReactIntl = require('react-intl');
const FormattedRelative = ReactIntl.FormattedRelative;

@connect((store, ownProps) => {
    return {
    	messages: store.chat.messages,
    	betweenName: store.chat.betweenName
    };
})
class MsgContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
	    	visible: true
	    }

	    this.handleDelete = this.handleDelete.bind(this)
	}

	handleDelete(msg) {
		if(!msg.delUser.includes(msg._id)) {
			this.props.dispatch(ChatActions.deleteUserFromChatM(msg, this.props.betweenName.length));
		}
		this.setState({
	    	visible: false
	    });
	}

	render() {
		return (
			<div class={(this.state.visible)? '': 'noDisplay'} key={this.props._id}>
				<div class={(this.props.msg.read)? '': 'read'}>
		        	<ListItem
			          primaryText={
			          	<Container>
			          		<Row>
				          		<Col sm={10}>
				          			<span class='msgName'>{this.props.betweenName.map((user) => (user.id == this.props.msg.author)? user.name: '')}</span>
				          		</Col>
				          		<Col sm={2} onClick={ () => this.handleDelete(this.props.msg) }>
				          			<Icon>clear</Icon>
				          		</Col>
			          		</Row>
						</Container>
			          }
			          secondaryText={
			            <Container class='msgContainer' style={{height: 'auto'}}>
			            	<Row>
			            		<Col sm={12} class='msgText'>
			          				{this.props.msg.text}
			          			</Col>
			          		</Row>
			          		<Row>
				          		<Col sm={8}>
							    </Col>
								<Col sm={4}>
									<FormattedRelative value={this.props.msg.createdAt} />
								</Col>
							</Row>
			                
			            </Container>
			          }
			          secondaryTextLines={2}
			        />

		        </div>
	        </div>
		)
	}
}

export default MsgContainer;
