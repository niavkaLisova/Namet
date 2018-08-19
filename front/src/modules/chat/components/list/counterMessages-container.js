import React from 'react'
import { Container, Row, Col } from 'react-grid-system'

import * as ChatActions from '../../actions/chat-actions'
import CounterMessagesName from './counterMessagesName-container'
import MenuMessagesContainer from './menuMessages-container'

export default function CounterMessages(props) {
	if(props.between.length == 2) {
		props.that(ChatActions.getUser(props.between[0], props.between[1], props.id));	
	}

  return (
    <Container>
    	<Row>
        <Col sm={12} >
       	 	<CounterMessagesName id={props.id}  />
            {(props.unread)? props.unread: ''}
            {(props.active) ? 'Kessa': 'Doar'}
            <MenuMessagesContainer
            	handleDeleteAllM={props.handleDeleteAllM}
            	handleDeleteRoom={props.handleDeleteRoom}
             />
        </Col> 
      </Row>
    </Container>
  )
}