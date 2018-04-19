import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import * as ChatActions from '../actions/chat-actions'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      chat: store.chat.room,
      roomId: store.chat.roomId,
      limit: store.chat.limit
    };
})
class ListroomsContainer extends React.Component {
	constructor(props) {
    	super(props);
	}

	roomIdUpdated(id) {
		if(this.props.roomId != '') {
			this.props.socket.emit('leave room', this.props.roomId);
		}
		this.props.dispatch(ChatActions.beetwenUpdated(id));
		this.props.dispatch(ChatActions.getMessagesRoom(id, this.props.limit))
		this.props.socket.emit('join room', id);
		this.props.dispatch(ChatActions.limitStart());
		let style = window.getComputedStyle(window.document.getElementById('scroll'), null);
		let height = style.getPropertyValue("height");

		window.document.getElementById('scrollContainer').scrollTo(0, parseFloat(height))
	}

	render() {
		return (
			<List style={this.props.visible ? {} : { display: 'none' }}>
			    <Subheader>Chats</Subheader>
			    {(Object.keys(this.props.chat)).map((key) => {
				    return <ListItem
				      onClick={() => this.roomIdUpdated(this.props.chat[key]._id)}
				      key={key}
				      primaryText={this.props.chat[key].name}		      
			    />
				})}
		    </List>
		)
	}
}

export default socketConnect(ListroomsContainer);
