import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ListContainer from './list/list-container'
import BoxContainer from './box/box-container'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { socketConnect } from 'socket.io-react'
import appHistory from '../../../utils/app-history'

import * as ChatActions from '../actions/chat-actions'
import * as UserActions from '../../user/actions/user-actions'

@connect((store, ownProps) => {
  return {
  	idChat: ownProps.match.params.idChat,
  	limit: store.chat.limit,
  	chat: store.chat.room,
  	between: store.chat.between,
  	email: store.user.email,
  	activeRoom: store.user.activeRoom
  };
})
class ChatContainer extends React.Component {
	constructor(props) {
		super(props);

		let time = setInterval(() => {
      if (this.props.email.length > 0) {
      	if (this.props.idChat) {
      		console.log('is idchat', this.props.idChat)
      		this.handle();
      	} else {
      		console.log('active Room', this.props.activeRoom)
      		appHistory.push('/chat/' + this.props.activeRoom)
      	}
        clearInterval(time);
      }
    }, 1000);
	}

	componentDidUpdate(prevProps) {
		if (this.props.idChat != prevProps.idChat) {
			if (prevProps.idChat){
				this.props.socket.emit('leave room', prevProps.idChat);
			}

			this.handle();
		}
	}

	handle = () => {
		this.props.dispatch(ChatActions.beetwenUpdated(this.props.idChat));
		this.props.dispatch(ChatActions.getMessagesRoom(this.props.idChat, this.props.limit))
		this.props.socket.emit('join room', this.props.idChat);
		this.props.dispatch(ChatActions.limitStart());
		this.props.dispatch(ChatActions.messageRead(this.props.idChat, this));

		if (this.props.idChat) {
			this.props.dispatch(UserActions.selectActiveRoom(this.props.idChat));;
		}
		// this.props.dispatch(UserActions.getUnreadMessages());
		this.props.chat.map((item) => {
			this.props.dispatch(ChatActions.unreadSelect(item._id));
		});
		console.log('did update')
		
		setTimeout(function(){
			let style = window.getComputedStyle(window.document.getElementById('scroll'), null);
			let height = parseFloat(style.getPropertyValue("height"));
			window.document.getElementById('scrollContainer').scrollTo(0, height)
		}.bind(this), 1000)
	}

	render() {
		return (
			<Container fluid>
				{(localStorage.getItem('userId'))? (
			  	<Row>
				    <Col sm={4}>
						<ListContainer 
							idChat={this.props.idChat}
						 />
				    </Col>
				    <Col sm={8}>
				    	{(this.props.idChat)? (
				    		<BoxContainer roomId={this.props.idChat} />	
				    	): 'Open Chat'}
						</Col>
			  	</Row>
			  	) : (<Redirect to='/login' />) }
			</Container>
		)
	}
}

export default socketConnect(ChatContainer);

