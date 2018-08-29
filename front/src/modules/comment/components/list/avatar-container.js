import React from 'react'
import { API_DOMAIN } from '../../../../utils/config'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class AvatarContainer extends React.Component {
  render() { 
    const avatar = 'url(' + API_DOMAIN + 'public/upload/user/' + this.props.avatar + ')';
    
    return (
      <div
        style={{backgroundImage: avatar}}
        class='avatar'
      >
      </div>
    )
  }
};

export default AvatarContainer;
