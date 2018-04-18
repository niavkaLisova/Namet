import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as ChatActions from '../actions/chat-actions'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

import './Message.sass';

@connect((store, ownProps) => {
    return {
      chat: store.chat.room,
      roomId: store.chat.roomId,
      between: store.chat.between,
      messages: store.chat.messages,
      betweenName: store.chat.betweenName,
      limit: store.chat.limit
    };
})
class MessageContainer extends React.Component {
	constructor(props) {
    	super(props);

	    this.state = {
	    	message: '',
	    	roomId: '',
	    	id: ''
	    }; 

	    this.props.socket.on('message', (msg) => {
			// console.log(msg.user, msg.user == localStorage.getItem('userId'))
			if(msg.user == localStorage.getItem('userId')) {
				this.props.dispatch(ChatActions.messageAdd(msg));
			}
		});  
	}

	onChangeMessage(event) {
		this.setState({
	      message: event.target.value
	    });
	}

	sendMessage() {
		this.setState({
	      message: ''
	    });

		this.props.between.map((user) => {
			this.props.dispatch(ChatActions.sendMessage(this.props.roomId, this.state.message, user, this));
		})
	}

	incrementLimit() {
		this.props.dispatch(ChatActions.getMessagesRoom(this.props.roomId, this.props.limit + 5))
		this.props.dispatch(ChatActions.limitSet(5));
	}

	render() {
		return (
			<div>
				<List class='messageContainer'>
					<p onClick={this.incrementLimit.bind(this)}>More</p>
					<div class="messagesList">
						{this.props.messages.map( (msg) => {
							return (
								//<ListItem>
									<Card key={msg._id}>
									    <CardHeader
									      title={this.props.betweenName.map((user) => (user.id == msg.author)? user.name: '')}
									      subtitle={msg.text}
									      avatar=""
									    />
									</Card>
								//
								// </ListItem>
							)
						})}
					</div>
				</List>
				
				<div style={this.props.roomId? {} : { display: 'none' }}>
			    	<TextField
				     	hintText="text"
				     	name={'message'}
				     	fullWidth={true}
			            value={this.state.message}
			            onChange={this.onChangeMessage.bind(this)}
			            floatingLabelText="Message"
			    	/>
			    	<RaisedButton 
			    		primary={true}
						fullWidth={true}
						label="Send message"
						onClick={this.sendMessage.bind(this)}
					/>  
				</div>			
			</div>
		)
	}
}

export default socketConnect(MessageContainer);
