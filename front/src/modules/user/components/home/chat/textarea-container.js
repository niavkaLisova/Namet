import React from 'react'

import * as UserActions from '../../../actions/user-actions'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from '@material-ui/core/TextField'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
    	user: store.user
    };
})
class TextareaContainer extends React.Component {
	constructor(props) {
    	super(props);

	    this.state = {
	    	message: '',
	    	type: false
	    }; 

	    this.props.socket.on('type general', (data) => {
	    	this.setState({
	    		type: true
	    	});

	    	setTimeout(() => {
				this.setState({
		    		type: false
		    	});
			}, 2000)
	    })
	}

	onChangeMessage = event => {
		this.setState({
	    	message: event.target.value
	    });
	    // this.props.socket.emit('type general b', { user: localStorage.getItem('userId') })
	}

	sendMessage() {
		this.setState({
	      message: ''
	    });

	    let date = (new Date()).getTime();

	    let messageObj = {
	    	time: date,
	    	text: this.state.message,
	    	author: this.props.user.name,
	    }
	    
		this.props.socket.emit('generalChat push messages b', messageObj)
	}

	render() {
		return (
			<div>
		    	<TextField
		          id="name"
		          label="message"
		          class="textarea"
		          value={this.state.message}
		          onChange={this.onChangeMessage}
		          margin="normal"
		          multiline
		          rowsMax="4"
		        />
		    	<p>{(this.state.type)? 'type...' : ''}</p>
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
