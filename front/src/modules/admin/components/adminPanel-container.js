import React from 'react'
import { socketConnect } from 'socket.io-react'

import Admin from './admin-container'

function AdminPanelContainer(props) {
  return (
    <Admin>
      <div>
        <p>Panel panel panel</p>
      </div>
    </Admin>
  );
}
export default socketConnect(AdminPanelContainer);
