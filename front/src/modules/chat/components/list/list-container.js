import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"
import { socketConnect } from 'socket.io-react'
import * as ChatActions from '../../actions/chat-actions'
import { API_DOMAIN } from '../../../../utils/config.js'
import {ToastContainer, ToastStore} from 'react-toasts'

import FindUserDialog from './findUser-dialog'
import UserCardContainer from './userCard-container'
import ListroomsContainer from './listrooms-container'
import FriendChatList from './friendChatList-container'

import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
    return {
    	findUser: store.chat.findUser,
    	room: store.chat.room
    };
})
class ListContainer extends React.Component {
	constructor(props) {
  	super(props);

    this.state = {
    	receiver: '',
    	visible: true,
    	receiverObj: {},
    	openModal: false,
    };
    this.props.dispatch(ChatActions.allChat());

		this.props.socket.on('room created', (data) => {
	    this.props.dispatch(ChatActions.chatAddRoom(data));
	  })
	}

	setUserAdd = (data) => {
		this.setState({receiverObj: data})
	};

	handleOpen = () => {
		this.setState({openModal: true});
	};

	handleClose = () => {
		this.setState({openModal: false});
	};

	userAddFunc() {
		if(this.state.receiverObj._id) {
		  this.props.dispatch(ChatActions.chatFindUser([]));
			this.props.dispatch(ChatActions.newChat(this.state.receiverObj, this.props.user, this));
		} else {
		  ToastStore.error('Cannot create new Chat');
		}

		this.setState({
	    	receiver: '',
	    	receiverObj: {},
	    	visible: true,
	    	openModal: false
	    });
	}

	newChat() {
		if (this.state.receiver) {
			if (!this.state.receiverObj._id && this.props.findUser.length > 0) {
				this.handleOpen();
			} else {
				this.userAddFunc();
			}	
		}
	}

	onChangeReceiver = event => {
		let visible = (event.target.value.length > 0)? false: true;
	    this.setState({
	      receiver: event.target.value,
	      visible
	    });

	    if (event.target.value.length > 0) {
	    	this.props.dispatch(ChatActions.findUser(event.target.value));
	    } else {
	    	this.props.dispatch(ChatActions.chatFindUser([]));
	    }
	}

	findReceiver(user) {
		this.setState({
			receiver: user.name,
			receiverObj: user
		})
	}

	render() {
		return (
			<div>
				<FindUserDialog 
					handleClose={this.handleClose.bind(this)}
					handleOpen={this.handleOpen.bind(this)}
					open={this.state.openModal}
					findUser={this.props.findUser}
					setUserAdd={this.setUserAdd.bind(this)}
					userAddFunc={this.userAddFunc.bind(this)}
				 />
				<div>
					<Subheader>Find user</Subheader>
			    	<TextField
						hintText="Receiver"
				     	name={'Receiver or receivers'}
				        value={this.state.receiver}
				        onChange={this.onChangeReceiver}
				        floatingLabelText="Receiver"
			    	/>
				    <Button 
				    	variant="outlined"
				    	color="secondary"
				    	onClick={this.newChat.bind(this)}
				     >
				    	add
				    </Button>

				    <div>
					    {(!this.state.visible) ? (this.props.findUser.map( (user) => {
							return (
								<UserCardContainer
									user={user}
									key={user._id}
									handle={this.findReceiver.bind(this)}
								 />
								)
							})) : ''}
				    </div>

				    <div>
				    	{(this.props.room.length && this.state.visible)? 
				    		(<ListroomsContainer 
				    			chat={this.props.room} 
				    			visible={this.state.visible}
				    			idChat={this.props.idChat}
				    		 />)
							:'' }
				    </div>
				    <FriendChatList chat={this.props.room} friend={this.props.findUser} visible={!this.state.visible} />
				</div>
			</div>
		)
	}
}

export default socketConnect(ListContainer);
