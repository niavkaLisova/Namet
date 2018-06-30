import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import * as ChatActions from '../actions/chat-actions'
import CounterMessagesName from './counterMessagesName-container'
import MenuMessages from './menuMessages-container'

export default function CounterMessages(props) {
	if(props.between.length == 2) {
		props.that(ChatActions.getUser(props.between[0], props.between[1], props.id));	
	}

    return (
        <Container>
	        <MenuMessages
	        	anchorEl={props.anchorEl}
	        	handleClose={props.handleClose}
	        	handleDeleteAllM={props.handleDeleteAllM}
	        	handleDeleteRoom={props.handleDeleteRoom}
	        	msg={props}
	        />
        	<Row>
		        <Col sm={10} >
		            <CounterMessagesName id={props.id}  />
		            {(props.unread)? props.unread: ''}
		            {(props.active) ? 'Kessa': 'Doar'}
		        </Col> 
				<Col sm={2}>
	            	<i 
	            		class="material-icons" 
	            		onClick={(e) => props.seeOptions(e)}>
	            		more_vert
	            	</i> 	
	            </Col>
            </Row>   
        </Container>
    )
}