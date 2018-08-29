import React from 'react'
import { API_DOMAIN } from '../../../../utils/config'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class AvatarContainer extends React.Component {
  goToAuthor = () => {
    appHistory.push('/user/' + this.props.idAuthor);
  }

  render() { 
    const avatar = 'url(' + API_DOMAIN + 'public/upload/user/' + this.props.avatar + ')';
    
    return (
      <div
        style={{backgroundImage: avatar}}
        class='avatarComment pointer comHover'
        onClick={this.goToAuthor}
      >
      </div>
    )
  }
};

export default AvatarContainer;
