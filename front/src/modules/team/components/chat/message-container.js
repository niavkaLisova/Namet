import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import ReactTimeout from 'react-timeout'
import { socketConnect } from 'socket.io-react'
import { List, ListItem } from 'material-ui/List'

import * as TeamActions from '../../actions/team-actions'
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

    	this.props.socket.on('teamChat get messages', (list) => {
    		if (list) {
	    		this.props.dispatch(TeamActions.setListChat(list));
    		}
	    	
	    	let nodeList = window.document.getElementById('scrollTeaml')
		    let node = window.document.getElementById('scrollTeamC')

		    if(node) { 
				node.scrollTo(0, nodeList.clientHeight);
			}
	    })

    	this.props.socket.on('teamChat push message', message => {
	    	this.props.dispatch(TeamActions.pushListChat(message))
	    
			let nodeList = window.document.getElementById('scrollTeaml')
		    let node = window.document.getElementById('scrollTeamC')

		    if(node) {
				node.scrollTo(0, nodeList.clientHeight);
			}
	    });

	    this.props.socket.on('scroll down', () => {
	    	let nodeList = window.document.getElementById('scrollTeam')
		    let node = window.document.getElementById('scrollTeamC')

		    if(node) {
				node.scrollTo(0, nodeList.clientHeight);
			}
	    });
	}

	render() {
		return (
			<List class='messagesTeamContainer' id='scrollTeamC'>
			    <List class='messagesList' id='scrollTeaml'>
			    	{this.props.listChat.map((msg, index) => {
			    		if (index - 1 == -1 || (index - 1 >= 0 && msg._id != (this.props.listChat[index - 1])._id)) {
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
