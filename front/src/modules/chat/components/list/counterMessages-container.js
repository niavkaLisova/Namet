import React from 'react'
import { Container, Row, Col } from 'react-grid-system'

import * as ChatActions from '../../actions/chat-actions'
import CounterMessagesName from './counterMessagesName-container'

export default function CounterMessages(props) {
	if(props.between.length == 2) {
		props.that(ChatActions.getUser(props.between[0], props.between[1], props.id));	
	}

    return (
        <Container>
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