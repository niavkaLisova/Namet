import React from 'react'
import * as ChatActions from '../../actions/chat-actions'
import { connect } from "react-redux"

@connect((store, ownProps) => {
    return {
    	chatName: store.chat.chatName
    };
})
export default class CounterMessagesName extends React.Component {
	constructor(props) {
		super(props);
	}

    render() {
	    return (
	        <div>
	        	{this.props.chatName[this.props.id]}
	        </div>
	    )
	}
}