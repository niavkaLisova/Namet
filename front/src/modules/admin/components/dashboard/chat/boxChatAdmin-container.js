import React from 'react'
import { socketConnect } from 'socket.io-react'

import * as AdminActions from '../../../actions/admin-actions'
import TextareaContainer from './textarea-container'
import MessageContainer from './message-container'

import Icon from '@material-ui/core/Icon'

class BoxChatContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		  	<div>
		  		<MessageContainer />
		  		<TextareaContainer />
		  	</div>
		)
	}
}

export default socketConnect(BoxChatContainer)