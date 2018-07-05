import React from 'react'
import { socketConnect } from 'socket.io-react'

import Admin from './admin-container'
import BoxListAdminContainer from './dashboard/boxListAdmin-container'
import BoxChatContainer from './dashboard/chat/boxChatAdmin-container'

import { Container, Row, Col } from 'react-grid-system'

function AdminPanelContainer(props) {
  return (
    <Admin>
      <Row>
        <Col md={8}>
        	<BoxChatContainer />
        </Col>
        <Col md={4}>
        	<BoxListAdminContainer />
        </Col>
      </Row>
    </Admin>
  );
}
export default socketConnect(AdminPanelContainer);
