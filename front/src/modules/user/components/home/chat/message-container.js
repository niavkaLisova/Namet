import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import ReactTimeout from 'react-timeout'
import { socketConnect } from 'socket.io-react'
import { List, ListItem } from 'material-ui/List'

import * as UserActions from '../../../actions/user-actions'
import MsgContainer from './msg-container'

import Divider from 'material-ui/Divider';
import { connect } from "react-redux"
import { IntlProvider } from 'react-intl'

@connect((store, ownProps) => {
    return {
    	listChat: store.user.listChat,
    	user: store.user.name
    };
})
class MessageContainer extends React.Component {
	constructor(props) {
    	super(props);

    	this.props.socket.on('generalChat get messages', (list) => {
	    	this.props.dispatch(UserActions.setListChat(list));
	    	
	    	let nodeList = window.document.getElementById('scrollGeneral')
		    let node = window.document.getElementById('scrollGeneralC')

		    if(node) { 
				node.scrollTo(0, nodeList.clientHeight);
			}
	    })

    	this.props.socket.on('generalChat push message', message => {
	    	this.props.dispatch(UserActions.pushListChat(message))
	    
			let nodeList = window.document.getElementById('scrollGeneral')
		    let node = window.document.getElementById('scrollGeneralC')

		    if(node) {
				node.scrollTo(0, nodeList.clientHeight);
			}
	    });

	    this.props.socket.on('scroll down', () => {
	    	let nodeList = window.document.getElementById('scrollGeneral')
		    let node = window.document.getElementById('scrollGeneralC')

		    if(node) {
				node.scrollTo(0, nodeList.clientHeight);
			}
	    });
	}

	render() {
		return (
			<List class='messagesContainer' id='scrollGeneralC'>
			    <List class='messagesList' id='scrollGeneral'>
			    	{this.props.listChat.map((msg, index) => {
			    		if (index - 1 >= 0 && msg._id != (this.props.listChat[index - 1])._id) {
			    			return <div key={index}>
					    			<IntlProvider locale="en">
										<MsgContainer msg={msg} username={this.props.user} />
									</IntlProvider>
								</div>
			    		}
			    		
						}
				)}
					
				</List>				
			</List>
		)
	}
}

export default socketConnect(ReactTimeout(MessageContainer));
