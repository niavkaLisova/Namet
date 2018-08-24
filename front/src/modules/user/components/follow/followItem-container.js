import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    
  };
})
class FollowItemContainer extends React.Component {
  goToUser = () => {
    appHistory.push('/user/' + this.props.follower._id)
  }

  render() {
    const follower = this.props.follower;
    const image = 'url(' + API_DOMAIN + 'public/upload/user/' + follower.avatar + ')';

    return (
      <div>
        <div
          alt={follower.nickname}
          class='followImg'
          style={{backgroundImage: image }}
          onClick={this.goToUser}  
         ></div>

      </div>
    )
  }
};

export default FollowItemContainer;
