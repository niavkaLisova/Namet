import React from 'react'

import { API_DOMAIN } from '../../../../utils/config.js'
import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"

import { Container, Row, Col } from 'react-grid-system'
import { Link } from 'react-router-dom'

@connect((store, ownProps) => {
  return {
    adminTeam: store.team.adminTeam
  };
})
class AdminContainer extends React.Component {
  goToAdmin = id => {
    appHistory.push('/user/' + id);
  }

  render() {
    return (
      <div>
        {this.props.adminTeam.map((admin, index) => {
          return (
            <Col md={4} key={admin._id}>
              <h4>{admin.nickname}</h4>
              <Link to={`/user/${admin._id}`}>See page</Link>
              {(admin.avatar && admin.avatar.length > 1)? (
                <img
                  class='adminAvatar'
                  src={API_DOMAIN + 'public/upload/user/' + admin.avatar}
                  />
              ): ('')}
            </Col>
          )
        })}
      </div>
    )
  }
};

export default AdminContainer;
