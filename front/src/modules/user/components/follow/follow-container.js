import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import * as UserActions from '../../actions/user-actions'
import appHistory from '../../../../utils/app-history'
import { socketConnect } from 'socket.io-react'

import Avatar from '@material-ui/core/Avatar'
import FollowListContainer from './followList-container'

import { Container, Row, Col } from 'react-grid-system'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    listFollowers: store.user.listFollowers,
    followingList: store.user.followingList,
    id: ownProps.match.params.id
  };
})
class FollowContainer extends React.Component {
  constructor(props) {
    super(props)

    this.props.dispatch(UserActions.followersList(this.props.id));
    this.props.dispatch(UserActions.findInfoFollowing(this.props.id));
  }

  goToUser = id => {
    appHistory.push('/user/' + id)
  }

  render() {
    return (
      <Container fluid>        
        <Row>
          <Col md={6}>
            <h3>Followers</h3>
            {this.props.listFollowers.map(follower => {
              return (
                <div key={follower._id}>
                  <p onClick={() => this.goToUser(follower._id)}>{follower.name}</p>
                  <Avatar
                    alt={follower.nickname}
                    src={API_DOMAIN + 'public/upload/user/' + follower.avatar} />

                </div>
              )
            })}
          </Col>
          <Col md={6}>
            <h3>Following</h3>
            {this.props.followingList.map((follower, index) => {
              return (
                <FollowListContainer 
                  follower={follower}
                  key={follower._id}
                  id={this.props.id}
                 />
              )
            })}
          </Col>
        </Row>
      </Container>
    )
  }
};

export default socketConnect(FollowContainer);
