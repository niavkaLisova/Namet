import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from "react-redux"
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { Container, Row, Col } from 'react-grid-system'

import '../User.sass'

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
export default class PasswordSettingsContainer extends React.Component {
  componentDidMount() {

    ValidatorForm.addValidationRule('isPasswordProper', (value) => {
      if (value !== this.props.newPassword) {
        return false;
      }
      return true;
    });
  }


  render() {
    const { submittedPassword, user } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <p>Change Password</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ValidatorForm
            ref="form"
            onSubmit={this.props.handleSubmitPassword}
           >
            <Row>
              <TextValidator
                label="Currently Password"
                onChange={this.props.handlePassword}
                name="currentlyPassword"
                type="password"
                value={this.props.currentlyPassword}
                validators={['required']}
                errorMessages={['this field is required']}
              / >
            </Row>
            <Row>
              <TextValidator
                label="New Password"
                onChange={this.props.handlePassword}
                name="newPassword"
                type="password"
                value={this.props.newPassword}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                label="Confirm Password"
                onChange={this.props.handlePassword}
                name="confirmPassword"
                type="password"
                value={this.props.confirmPassword}
                validators={['required', 'isPasswordProper']}
                errorMessages={['this field is required', 'password is not right']}
              />
            </Row>
            <Row>
              <Button
                type="submit"
                disabled={submittedPassword}
              >
                {
                    (submittedPassword && 'Your form is submitted!')
                    || (!submittedPassword && 'Update Password')
                }
              </Button>
            </Row>
            </ValidatorForm>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};

