import React from 'react'

import * as CommentActions from '../../actions/comment-actions'
import appHistory from '../../../../utils/app-history'

import { connect } from "react-redux"

import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
const ReactIntl = require('react-intl');
const FormattedRelative = ReactIntl.FormattedRelative;

import Icon from '@material-ui/core/Icon'

@connect((store, ownProps) => {
  return {
  };
})
class InfoContainer extends React.Component {
  handleAnswerTo = () => {
    if (this.props.info._id != localStorage.getItem('userId'))  {
      this.props.dispatch(CommentActions.setIdAnswerer(this.props.info.name));
    }
  }
  
  render() {
    return (
      <div class='infoBox'>
        
        <div class='distance info'>
          <div>
            <span 
              class='pointer'
              onClick={this.handleAnswerTo}
             >
              {this.props.info.name}
            </span>
            <span>
              {(this.props.comment.answerer)? (
                <span> answer to {this.props.comment.answerer}</span>
              ): '' }
            </span>
          </div>
          <div>
            <FormattedRelative value={this.props.comment.createdAt} />
            {(this.props.info._id == localStorage.getItem('userId'))? (
              <span>
                <Icon
                  class='pointer'
                  onClick={this.props.clearComment}
                >clear</Icon>
              </span>
            ): ''}
          </div>
        </div>
      </div>
    )
  }
};

export default InfoContainer;
