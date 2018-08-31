import React from 'react'
import * as UserActions from '../../../user/actions/user-actions'
import * as GameActions from '../../actions/game-actions'

import appHistory from '../../../../utils/app-history'
import { connect } from "react-redux"
import { ToastContainer, ToastStore } from 'react-toasts'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

@connect((store, ownProps) => {
  return {
  };
})
class GameCreateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thema: ''
    }
  }

  handleCreate = () => {
    this.props.dispatch(GameActions.createGame(this.state.thema));

    this.setState({ thema: '' })
  }

  handleChangeThema = e => {
    this.setState({ thema: e.target.value })
  }

  render() {
    return (
      <div>
        <Link to='/game/home'>
          Game Home
        </Link>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleCreate}
        >

          <TextValidator
            label='Thema'
            onChange={this.handleChangeThema}
            value={this.state.thema}
            name='thema'
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
           > Create
          </Button>
        </ValidatorForm>
      </div>
    )
  }
};

export default GameCreateContainer;
