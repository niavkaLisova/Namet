import React from 'react'
import ReactDOM from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { socketConnect } from 'socket.io-react'
import * as ChatActions from '../actions/chat-actions'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      roomId: store.chat.roomId,
      between: store.chat.between,
      messages: store.chat.messages,
      activeRoom: store.user.activeRoom
    };
})
class TextareaContainer extends React.Component {
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

	    let nodeList = window.document.getElementById('scroll')
	    let node = window.document.getElementById('scrollContainer')
		let style = window.getComputedStyle(nodeList, null);
		let height = parseFloat(style.getPropertyValue("height"));

		const random = Math.random(); 
		
		this.props.between.map((user) => {
			
			if(user == localStorage.getItem('userId')) {
				this.props.dispatch(ChatActions.sendMessage(this.props.roomId, this.state.message, user, this, node, height, true, random));
			} else {
				this.props.dispatch(ChatActions.sendMessage(this.props.roomId, this.state.message, user, this, node, height, false, random));
			}
		})
		this.props.dispatch(ChatActions.allChat());

	}

	render() {
		return (
			<div style={this.props.activeRoom != '0' ? {} : { display: 'none' }}>
		    	<TextField
			     	hintText="text"
			     	name={'message'}
			     	fullWidth={true}
		            value={this.state.message}
		            onChange={this.onChangeMessage.bind(this)}
		            floatingLabelText="Message"
		            multiLine={true}
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

export default socketConnect(TextareaContainer);
