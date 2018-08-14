import React from 'react';
import { API_DOMAIN } from '../../../utils/config.js'

import * as UserActions from '../actions/user-actions'
import appHistory from '../../../utils/app-history'
import { connect } from "react-redux"

import Avatar from '@material-ui/core/Avatar'

@connect((store, ownProps) => {
  return {
    
  };
})
class FollowListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }
  }

  handleUnsubscribe = user => {
    this.props.dispatch(UserActions.unsubscribe(user))
    this.setState({ visible: false })
  }

  goToUser = () => {
    appHistory.push('/user/' + this.props.follower._id)
  }

  render() {
    const follower = this.props.follower;

    return (
      <div>
      {(this.state.visible)? (
      <div>
        <p onClick={this.goToUser}>{follower.name}</p>
        <Avatar
          alt={follower.nickname}
          src={API_DOMAIN + 'public/upload/user/' + follower.avatar} />
        {(this.props.id == localStorage.getItem('userId'))? (
          <p onClick={() => this.handleUnsubscribe(follower._id)}> unsubscribe</p>
        ): ('')}
      </div>
      ): ('')}
      </div>
    )
  }
};

export default FollowListContainer;
