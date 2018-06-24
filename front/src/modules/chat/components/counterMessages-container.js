import React from 'react'

import * as ChatActions from '../actions/chat-actions'
import CounterMessagesName from './counterMessagesName-container'

export default function CounterMessages(props) {
	if(props.between.length == 2) {
		props.that(ChatActions.getUser(props.between[0], props.between[1], props.id));	
	}

    return (
        <div>
            <CounterMessagesName id={props.id} /> {props.unread}
            {(props.active) ? 'Kessa': 'Doar'}      
        </div>
    )
}