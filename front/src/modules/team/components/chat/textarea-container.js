import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from '@material-ui/core/TextField'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  	user: store.user.name
  };
})
class TextareaContainer extends React.Component {
	constructor(props) {
  		super(props);

	    this.state = {
	    	message: ''
	    };
	}

	onChangeMessage = event => {
		this.setState({
	    	message: event.target.value
	    });
	}

	sendMessage() {
		this.setState({
      message: ''
    });

    let date = (new Date()).getTime();

    let messageObj = {
    	time: date,
    	text: this.state.message,
    	author: this.props.user,
    }
	    
		this.props.socket.emit('teamChat push messages b',
			{ message: messageObj, room: this.props.idTeam })
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
