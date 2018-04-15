import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import * as ChatActions from '../actions/chat-actions'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
      chat: store.chat.room,
      roomId: store.chat.roomId,
      beetwen: store.chat.beetwen
    };
})
export default class ListContainer extends React.Component {
	constructor(props) {
    	super(props);

	    this.state = {
	    	receiver: '',
	    	open: false
	    };
	    this.props.dispatch(ChatActions.allChat());
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	onChangeReceiver(event) {
	    this.setState({
	      receiver: event.target.value
	    });
	}

	newChat() {
		// console.log(this.state.receiver + 'vs' + localStorage.getItem('userId'));
		this.setState({
	      receiver: ''
	    });
		this.props.dispatch(ChatActions.newChat(this.state.receiver));
	}

	roomIdUpdated(id) {
		this.props.dispatch(ChatActions.beetwenUpdated(id));
		this.props.dispatch(ChatActions.getMessages(id))
	}

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton 
        label="add" 
        primary={true} 
        onClick={this.newChat.bind(this)} 
      />,
    ];
		return (
			<div>		
				<List>
				    <Subheader>Chats</Subheader>
				    <RaisedButton label="Add chat" onClick={this.handleOpen} />
				    {(Object.keys(this.props.chat)).map((key) => {
					    return <ListItem
					      onClick={() => this.roomIdUpdated(this.props.chat[key]._id)}
					      key={key}
					      primaryText={this.props.chat[key].name}
					      leftAvatar={<Avatar src=""
					      />}
				    />
					})}
			    </List>
			
		        <Dialog
		          title="Add chat"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
		       	<TextField
			     	hintText="Receiver or receivers"
			     	name={'Receiver or receivers'}
		            value={this.state.receiver}
		            onChange={this.onChangeReceiver.bind(this)}
		            floatingLabelText="Receiver"
		    	/>    
		        </Dialog>
			</div>
		)
	}
}