import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader'
import * as ChatActions from '../actions/chat-actions'
import ListroomsContainer from './listrooms-container'
import FriendChatList from './friendChatList-container'
import FindUserDialog from './findUser-dialog.js'
import { socketConnect } from 'socket.io-react'
import { connect } from "react-redux"
import { API_DOMAIN } from '../../../utils/config.js'

@connect((store, ownProps) => {
    return {
      roomId: store.chat.roomId,
      findUser: store.chat.findUser,
      user: store.user.name,
      limit: store.chat.limit,
      test: store.chat.room,
      translate: store.locale.translations
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

	handleOpen = () => {
		this.setState({openModal: true});
	};

	handleClose = () => {
		this.setState({openModal: false});
	};

	setUserAdd = (data) => {
		this.setState({receiverObj: data})
	};

	onChangeReceiver(event) {
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

	userAddFunc() {
		if(this.state.receiverObj._id) {
		  this.props.dispatch(ChatActions.chatFindUser([]));
			this.props.dispatch(ChatActions.newChat(this.state.receiverObj, this.props.user, this));
		} else {
		  this.props.dispatch(ChatActions.chatNoCreate())
		}

		this.setState({
	    	receiver: '',
	    	receiverObj: {},
	    	visible: true,
	    	openModal: false
	    });
	}

	newChat() {
		if(this.state.receiver) {
			if (!this.state.receiverObj._id && this.props.findUser.length > 0) {
				this.handleOpen();
			} else {
				this.userAddFunc();
			}	
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
				<List>
					<Subheader>Find user</Subheader>
			    	<TextField
						hintText="Receiver"
				     	name={'Receiver or receivers'}
	            value={this.state.receiver}
	            onChange={this.onChangeReceiver.bind(this)}
	            floatingLabelText="Receiver"
			    	/> 
			    	<FlatButton
			        label="add" 
			        primary={true} 
			        onClick={this.newChat.bind(this)}
			      />
				
					{(!this.state.visible) ? (this.props.findUser.map( (user) => {
						return (
							<Card key={user._id}>}
						    <CardHeader
						      title={user.name}
						      subtitle={user.email}
						      avatar={API_DOMAIN + 'public/upload/user/noname.png'}
						      onClick={ () => this.findReceiver(user)}
						    />
							</Card>
							)
					})) : ''
					}
				</List>
				{ (this.props.test.length)? <ListroomsContainer chat={this.props.test} visible={this.state.visible} startChat={this.props.test} />
			:'' }
				<FriendChatList chat={this.props.test} friend={this.props.findUser} visible={!this.state.visible} />
			</div>
		)
	}
}

export default socketConnect(ListContainer);
