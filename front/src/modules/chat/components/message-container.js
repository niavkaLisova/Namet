import React from 'react'
import ReactDOM from 'react-dom'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import ReactTimeout from 'react-timeout'
import { socketConnect } from 'socket.io-react'
import { List, ListItem } from 'material-ui/List'
import * as ChatActions from '../actions/chat-actions'
import MsgContainer from './msg-container'
import Divider from 'material-ui/Divider';
import { connect } from "react-redux"
import { IntlProvider } from 'react-intl'

import './Message.sass';

@connect((store, ownProps) => {
    return {
      roomId: store.chat.roomId,
      messages: store.chat.messages,
      limit: store.chat.limit,
      user: store.user
    };
})
class MessageContainer extends React.Component {
	constructor(props) {
    	super(props);

	    this.state = {
  	  		loading: false,
  	  		loader: true
		};
	}

	incrementLimit() {
		this.props.dispatch(ChatActions.getMessagesRoom(this.props.roomId, this.props.limit + 5))
		this.props.dispatch(ChatActions.limitSet(5));
	}

	onScroll() {
		if(!this.state.loader) return false;
		
		const node = ReactDOM.findDOMNode(this.refs.messageContainer)
		let style = window.getComputedStyle(window.document.getElementById('scroll'), null);
		let height = parseFloat(style.getPropertyValue("height"));

		if(node.scrollTop == 0) {
			this.setState({
				loading: true
			})

			this.props.setTimeout(() => {
				let style2 = window.getComputedStyle(window.document.getElementById('scroll'), null);
				let height2 = parseFloat(style2.getPropertyValue("height"));

				if(height == height2) {
					this.setState({
						loader: false
					});
				}

				window.document.getElementById('scrollContainer').scrollTo(0, height2 - height)
			}, 3000);

			this.props.setTimeout(() => {
				this.incrementLimit()
				this.setState({
					loading: false
				})
			}, 2000);
		}
	}

	render() {
		return (
			<List 
				class='messageContainer' 
				id='scrollContainer' 
				ref="messageContainer" 
				onScroll={ () => this.onScroll() }
				>
				{(this.state.loader)?(
					<RefreshIndicator
				      size={40}
				      left={10}
				      top={0}
				      status="loading"
				      style={this.state.loading ? {} : { display: 'none' }}
				    />
			    ): 'Start' }
			    {(this.props.user.activeRoom == '0')? '' : (
				<List class='messagesList' id='scroll' ref="messageList">
					{this.props.messages.map( (msg) => {
						return (
							<div key={msg._id}>
								<IntlProvider locale="en">
									<MsgContainer msg={msg} />
								</IntlProvider>
								<Divider />
							</div>
						)
					})}
				</List>
				)}
			</List>
		)
	}
}

export default socketConnect(ReactTimeout(MessageContainer));
