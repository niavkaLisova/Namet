import React from 'react'
import * as UserActions from '../../../user/actions/user-actions'
import * as GameActions from '../../actions/game-actions'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
  return {
    records: store.game.records
  };
})
class RecordListContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.records.map(record => {
          return (
            <div 
              key={record._id}
              onClick={() => this.props.handleSelect(record)}
             >
              {record.title}
            </div>
          )
        })}
   
      </div>
    )
  }
};

export default RecordListContainer;
