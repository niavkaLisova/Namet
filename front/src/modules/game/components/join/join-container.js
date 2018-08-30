import React from 'react'
import * as UserActions from '../../../user/actions/user-actions'
import * as GameActions from '../../actions/game-actions'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { ToastContainer, ToastStore } from 'react-toasts'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import Button from '@material-ui/core/Button'

import RecordListContainer from './recordList-container'

@connect((store, ownProps) => {
  return {
    idGame: ownProps.match.params.idGame,
    records: store.game.records
  };
})
class JoinContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: '',
      idRecord: null 
    }
  }

  handleChangeRecord = e => {
    this.props.dispatch(GameActions.findRecorWith(e.target.value));
    this.setState({ record: e.target.value })
  }

  handleJoin = () => {
    if (this.state.idRecord) {
      this.props.dispatch(GameActions.joinGame(this.props.idGame, this.state.idRecord))
    } else {
      ToastStore.error('select record');
    }

    this.setState({
      record: '',
      idRecord: null
    })
  }

  handleSelect = select => {
    this.setState({
      record: select.title,
      idRecord: select._id
    })
    this.props.dispatch(GameActions.saveRecords([]));
  }

  render() {
    return (
      <div>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleJoin}
          >

          <TextValidator
            label='Select Record'
            onChange={this.handleChangeRecord}
            value={this.state.record}
            name='record'
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <RecordListContainer
            handleSelect={this.handleSelect}
           />
          <Button
            variant='contained'
            color='primary'
            type='submit'
           > Join
          </Button>
        </ValidatorForm>
      </div>
    )
  }
};

export default JoinContainer;
