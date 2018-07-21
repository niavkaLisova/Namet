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
export default class NameSettingsContainer extends React.Component {
  render() {
    const { submittedName, user } = this.props; 

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <p>Change Name</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ValidatorForm
            ref="form"
            onSubmit={this.props.handleSubmitName}
           >
            <Row>
              <TextValidator
                label="New Name"
                onChange={this.props.handleName}
                name="name"
                value={this.props.name}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Row>
            <Row>
              <Button
                type="submit"
                disabled={submittedName}
              >
                {
                    (submittedName && 'Your form is submitted!')
                    || (!submittedName && 'Update Name')
                }
              </Button>
            </Row>
            </ValidatorForm>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
};

