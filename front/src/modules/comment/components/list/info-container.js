import React from 'react'

import * as CommentActions from '../../actions/comment-actions'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"

import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
const ReactIntl = require('react-intl');
const FormattedRelative = ReactIntl.FormattedRelative;

@connect((store, ownProps) => {
  return {
  };
})
class InfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='infoBox'>
        <div class='distance info'>
          <div>{this.props.info.name}</div>
          <div>
            <FormattedRelative value={this.props.comment.createdAt} />
          </div>
        </div>
      </div>
    )
  }
};

export default InfoContainer;
