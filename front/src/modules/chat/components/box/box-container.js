import React from 'react'
import ReactDOM from 'react-dom'
import * as ChatActions from '../../actions/chat-actions'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'
import MessageContainer from './message-container'
import TextareaContainer from './textarea-container'

@connect((store, ownProps) => {
  return {
  	
  };
})
class BoxContainer extends React.Component {
	constructor(props) {
  	super(props);

    this.props.socket.on('message', (msg) => {
			if(msg.user == localStorage.getItem('userId')) {
	    		if(msg.roomID == this.props.roomId) {
	    			msg.read = true;
	    			this.props.dispatch(ChatActions.messageRead(msg._id, msg.roomId));
	    		}	
	    		this.props.dispatch(ChatActions.messageAdd(msg));	
	    		let nodeList = window.document.getElementById('scroll')
					let node = window.document.getElementById('scrollContainer')
					let style = window.getComputedStyle(nodeList, null);
					let height = parseFloat(style.getPropertyValue("height"));

					node.scrollTo(0, height);
				}
			}); 
	}

	render() {
		return (
			<div>
				<MessageContainer roomId={this.props.roomId} />
				<TextareaContainer roomId={this.props.roomId} />
			</div>
		)
	}
}

export default socketConnect(BoxContainer);
