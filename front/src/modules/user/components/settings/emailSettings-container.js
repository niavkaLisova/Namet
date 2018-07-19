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
export default class EmailSettingsContainer extends React.Component {
  render() {
    const { submittedEmail, user } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <p>Change Email</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ValidatorForm
            ref="form"
            onSubmit={this.props.handleSubmitEmail}
           >
            <Row>
              <TextValidator
                label="Currently Password"
                onChange={this.props.handlePassword}
                type="password"
                name="currentlyPassword"
                value={this.props.currentlyPassword}
              / >
            </Row>
            <Row>
              <TextValidator
                label="New Email"
                onChange={this.props.handleEmail}
                name="newEmail"
                value={this.props.newEmail}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </Row>
            <Row>
              <Button
                type="submit"
                disabled={submittedEmail}
              >
                {
                    (submittedEmail && 'Your form is submitted!')
                    || (!submittedEmail && 'Update Email')
                }
              </Button>
            </Row>
            </ValidatorForm>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};

