import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import CounterMessages from './counterMessages-container'
import * as ChatActions from '../actions/chat-actions'
import * as UserActions from '../../user/actions/user-actions'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      chat: store.chat.room,
      roomId: store.chat.roomId,
      limit: store.chat.limit,
      messages: store.chat.messages,
      unread: store.chat.unread,
      between: store.chat.between
    };
})
class ListroomsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
  	  		msg: ''
		};
		this.props.startChat.map((item, index) => {
			this.props.dispatch(ChatActions.unreadSelect(item._id, index));
		})

		this.props.socket.on('message g', (data) => {
	      this.props.chat.map((item, index) => {
				this.props.dispatch(ChatActions.unreadSelect(item._id, index));
			});
	      this.props.dispatch(ChatActions.allChat());
	      console.log(data, 'g')
	    });

	    this.props.socket.on('reload read message', () => {
	    	this.props.chat.map((item, index) => {
				this.props.dispatch(ChatActions.getMessagesRoom(this.props.roomId, this.props.limit))
			});
	    })

		this.props.socket.on('message', (data) =>{
			this.props.dispatch(ChatActions.messageRead(this.props.roomId, this));
			this.props.dispatch(ChatActions.getMessagesRoom(this.props.roomId, this.props.limit))
		})
	}

	roomIdUpdated(id) {
		if(this.props.roomId != '') {
			this.props.socket.emit('leave room', this.props.roomId);
		}

		this.props.dispatch(ChatActions.beetwenUpdated(id));
		this.props.dispatch(ChatActions.getMessagesRoom(id, this.props.limit))
		this.props.socket.emit('join room', id);
		this.props.dispatch(ChatActions.limitStart());
		this.props.dispatch(ChatActions.messageRead(id, this));
		
		// console.log('new chats', this.props.chat);
		// this.props.dispatch(UserActions.getUnreadMessages());
		this.props.dispatch(UserActions.selectActiveRoom(id));
		this.props.chat.map((item, index) => {
			this.props.dispatch(ChatActions.unreadSelect(item._id, index));
		});
		let style = window.getComputedStyle(window.document.getElementById('scroll'), null);
		let height = parseFloat(style.getPropertyValue("height"));

		window.document.getElementById('scrollContainer').scrollTo(0, height);
	}

	render() {
		return (
			<List style={this.props.visible ? {} : { display: 'none' }}>
			    <Subheader>Chats</Subheader>
			    {(Object.keys(this.props.chat)).map((key) => {
				    return <ListItem
				      onClick={() => this.roomIdUpdated(this.props.chat[key]._id)}
				      key={key}
				      leftAvatar={<Avatar src='' />}
				      primaryText={<CounterMessages id={key} that={this.props.dispatch} unread={this.props.unread[key]} active={this.props.chat[key]._id == this.props.roomId}  between={this.props.chat[key].between} />}      
			    	/>
				})}
		    </List>
		)
	}
}

export default socketConnect(ListroomsContainer);
