import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import * as ChatActions from '../actions/chat-actions'
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
	}

	handleDelete(msg) {
		if(!msg.delUser.includes(msg._id)) {
			this.props.dispatch(ChatActions.deleteUserFromChat(msg, this.props.betweenName.length, this));
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
			          		<span class='msgName'>{this.props.betweenName.map((user) => (user.id == this.props.msg.author)? user.name: '')}</span>
						</Container>
			          }
			          secondaryText={
			            <Container>
			            	<Row>
			            		<Col sm={12}>
			          				{this.props.msg.text}
			          			</Col>
			          		</Row>
			          		<Row>
				          		<Col sm={8}>
				          			<div onClick={() => this.handleDelete(this.props.msg)}>
				          				<i class="material-icons">delete</i>
				          			</div>
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
