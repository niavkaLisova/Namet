import React from 'react'

import { API_DOMAIN } from '../../../../utils/config.js'
import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
    infoTeam: store.team.infoTeam
  };
})
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const info = this.props.infoTeam;

    return (
      <div>
        {(info)? (
          <div>
            <h3>{info.name}</h3>
            {(info.emblem)? (
                <img
                  class='teamEmblem'
                  src={API_DOMAIN + 'public/upload/team/' + info.emblem}
                  />
                ): ''}
          </div>
        ): ('')}
      </div>
    )
  }
};

export default MainContainer;
