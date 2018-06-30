import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import * as ChatActions from '../actions/chat-actions'
import CounterMessagesName from './counterMessagesName-container'

export default (props) => {
    return (
        <Container>
	        <Menu
	          id="simple-menu"
	          anchorEl={props.anchorEl}
	          open={Boolean(props.anchorEl)}
	          onClose={props.handleClose}
	        > 
	          <MenuItem onClick={props.handleDeleteAllM}>Delete all messeges</MenuItem>
	          <MenuItem onClick={props.handleDeleteRoom}>Delete chat</MenuItem>
	        </Menu>
        </Container>
    )
}