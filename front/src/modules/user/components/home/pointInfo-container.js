import React from 'react';
import { API_DOMAIN } from '../../../../utils/config.js'

import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"

@connect((store, ownProps) => {
  return {
  };
})
class PointInfoContainer extends React.Component {
  render() {
    return (
      <div>
        {(this.props.coin)? (
          <div>neutral: {this.props.coin.neutral}</div>
        ): ''}
      </div>
    )
  }
};

export default PointInfoContainer;
