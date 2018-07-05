import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import ReactTimeout from 'react-timeout'
import { socketConnect } from 'socket.io-react'
import { List, ListItem } from 'material-ui/List'

import * as AdminActions from '../../../actions/admin-actions'
import MsgContainer from './msg-container'

import Divider from 'material-ui/Divider';
import { connect } from "react-redux"
import { IntlProvider } from 'react-intl'

import '../../Admin.sass';

@connect((store, ownProps) => {
    return {
    	listChat: store.adminN.listChat
    };
})
class MessageContainer extends React.Component {
	constructor(props) {
    	super(props);

    	this.props.socket.on('adminChat get messages', (list) => {
	    	this.props.dispatch(AdminActions.setListChat(list));

	    	let nodeList = window.document.getElementById('scrollAdmin')
		    let node = window.document.getElementById('scrollAdminC')

			node.scrollTo(0, nodeList.clientHeight);
	    })

    	this.props.socket.on('adminChat push message', message => {
	    	this.props.dispatch(AdminActions.pushListChat(message))
	    
			let nodeList = window.document.getElementById('scrollAdmin')
		    let node = window.document.getElementById('scrollAdminC')

			node.scrollTo(0, nodeList.clientHeight);
	    });
	}

	render() {
		return (
			<List class='messagesContainer' id='scrollAdminC'>
			    <List class='messagesList' id='scrollAdmin'>
			    	{this.props.listChat.map(msg => {
			    		return <div key={msg._id}>
			    			<IntlProvider locale="en">
								<MsgContainer msg={msg} />
							</IntlProvider>
						</div>
						}
				)}
					
				</List>				
			</List>
		)
	}
}

export default socketConnect(ReactTimeout(MessageContainer));
