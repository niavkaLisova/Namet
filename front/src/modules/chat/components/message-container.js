import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as ChatActions from '../actions/chat-actions'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'

@connect((store, ownProps) => {
    return {
      chat: store.chat.room,
      roomId: store.chat.roomId,
      between: store.chat.between,
      messages: store.chat.messages
    };
})
class MessageContainer extends React.Component {
	constructor(props) {
    	super(props);

	    this.state = {
	    	message: '',
	    	roomId: ''
	    };
	    
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

	render() {
		return (
			<div>
				{this.props.messages.map( (msg) => {
					return (
						<Card key={msg._id}>
						    <CardHeader
						      title={msg.createdAt}
						      subtitle={msg.text}
						      avatar=""
						    />
						</Card>
					)
				})}

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
		)
	}
}

export default socketConnect(MessageContainer);
