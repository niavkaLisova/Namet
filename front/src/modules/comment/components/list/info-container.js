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
    answerer: store.comment.idAnswerer,
    admin: store.user.admin
  };
})
class InfoContainer extends React.Component {
  handleAnswerTo = () => {
    this.props.dispatch(CommentActions.setIdAnswerer(this.props.idComment));
  }

  handleAnsw = e => {
    this.props.handleChange(this.props.info.name);
  }
  
  render() {
    return (
      <div class='infoBox'>
        <div class='distance info'>
          <div>
            <span>
              {this.props.info.name}
            </span>
            <span>
            </span>
          </div>
          <div>
            {(this.props.show)? (
              <div
                class='pointer' 
                onClick={this.handleAnswerTo}
               >
                Answer
              </div>
            ): (
              (this.props.answerer == this.props.asnwerParent)? (
                <div
                  class='pointer'
                  onClick={this.handleAnsw}
                 >
                  Answ
                </div>
              ): ''
            )}
            <FormattedRelative value={this.props.comment.createdAt} />
            {((this.props.info._id == localStorage.getItem('userId')) ||
              this.props.admin)? (
              <span>
                <Icon
                  class='pointer'
                  onClick={() => this.props.clearComment(this.props.comment)}
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
