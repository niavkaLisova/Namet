import React from 'react'
import { socketConnect } from 'socket.io-react'

import { Container, Row, Col } from 'react-grid-system'

import RecordContainer from './recently/record-container'
import BoxChatContainer from './chat/boxChat-container'
const classNames = require('classnames')

class SidebarContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			switch: 'recently'
		}
	}

	handleSwitch = show => {
		this.setState({ switch: show })

		if ( show == 'chat') {
			this.props.socket.emit('teamChat get messages b', this.props.idTeam);
		}
	}

	render() {
		return (
			<div>

				<div class='switchSidebar'>
					<div
            onClick={() => this.handleSwitch('chat')}
            className={classNames({
              'switch-active': this.state.switch == 'chat'
            })}
	          		 >
	            Chat
	          </div>
					<div
            onClick={() => this.handleSwitch('recently')}
            className={classNames({
              'switch-active': this.state.switch == 'recently'
            })}
           >	
            Recently
          </div>
				</div>
				<div>
					{(this.state.switch == 'chat')? (
						<BoxChatContainer idTeam={this.props.idTeam} />
					): (
						<RecordContainer />
					)}
				</div>
			</div>
		)
	}
}

export default socketConnect(SidebarContainer);
