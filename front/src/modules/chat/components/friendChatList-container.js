import React from 'react'

import ListroomsContainer from './listrooms-container'
import { List, ListItem } from 'material-ui/List'
import * as ChatActions from '../actions/chat-actions'

export default function FriendChatList(props) { 
	let friend = props.friend.map((item) => {
		return item._id;
	})

	let listFriend = [];
	
    return (
    	<div>      
            {
	        	Array.prototype.map.call(props.chat, function(x) { 
				    for(let i = 0; i < friend.length; i++) {
				    	if(friend[i] == x.between[0] || friend[i] == x.between[1]) {
				    		listFriend.push(x)
				    	}
				    }
				})

            } 
    		{(listFriend.length > 0)? <ListroomsContainer visible={true} chat={listFriend} startChat={listFriend} />: '' }
        </div>
    )
}