import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"
import Grid from '@material-ui/core/Grid'
import { Container, Row, Col } from 'react-grid-system'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'

import '../User.sass'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['', '', ''];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <StepOne step={step} />;
    case 1:
      return <StepTwo step={step} />;
    case 2:
      return <StepThree step={step} />;
    default:
      return 'Unknown step';
  }
}

@connect((store, ownProps) => {
  return {
    answersOne: store.user.answersOne,
    answersTwo: store.user.answersTwo,
    answersThree: store.user.answersThree,
    answers: store.user.answers,
    topTeam: store.user.topTeam
  };
})
class TeamSettingsContainer extends React.Component {
   state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
  };

  totalSteps = () => {
    return getSteps().length;
  };

  isStepOptional = step => {
    
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed);

    completed.add(this.state.activeStep);
    this.setState({
      completed,
    });

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }

    let answers = this.props.answers;

    if (this.state.activeStep == 0) {
      if (answers[this.props.answersOne[0].team] == undefined){
        answers[this.props.answersOne[0].team] = 2;
      } else {
        answers[this.props.answersOne[0].team] += 2;
      }

      for (let i = 1; i < this.props.answersOne.length; i++) {
        if (answers[this.props.answersOne[i].team] == undefined){
          answers[this.props.answersOne[i].team] = 1;
        } else {
          answers[this.props.answersOne[i].team] += 1;
        }
      }

      this.props.dispatch(UserActions.saveAnswers(answers));
    } else if (this.state.activeStep == 1) {
      if (answers[this.props.answersTwo[0].team] == undefined){
        answers[this.props.answersTwo[0].team] = 2;
      } else {
        answers[this.props.answersTwo[0].team] += 2;
      }

      for (let i = 1; i < this.props.answersTwo.length; i++) {
        if (answers[this.props.answersTwo[i].team] == undefined){
          answers[this.props.answersTwo[i].team] = 1;
        } else {
          answers[this.props.answersTwo[i].team] += 1;
        }
      }

      this.props.dispatch(UserActions.saveAnswers(answers));
    } else {
      if (answers[this.props.answersThree[0].team] == undefined){
        answers[this.props.answersThree[0].team] = 2;
      } else {
        answers[this.props.answersThree[0].team] += 2;
      }

      for (let i = 1; i < this.props.answersThree.length; i++) {
        if (answers[this.props.answersThree[i].team] == undefined){
          answers[this.props.answersThree[i].team] = 1;
        } else {
          answers[this.props.answersThree[i].team] += 1;
        }
      }

      this.props.dispatch(UserActions.saveAnswers(answers));
    }

    if(this.state.completed.size == 2) {
      let sortable = [];
      for (let vehicle in this.props.answers) {
          sortable.push([vehicle, this.props.answers[vehicle]]);
      }

      sortable.sort(function(a, b) {
        return a[1] - b[1];
      });

      let topTeam = sortable.reverse().splice(0, 3);
      console.log(topTeam, 'sortable');
      this.props.dispatch(UserActions.setTopTeam(topTeam));
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    });
  };

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
     <div className={classes.root}>
      {!this.allStepsCompleted() ? (
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const buttonProps = {};
            if (this.isStepOptional(index)) {
              buttonProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      ): ''}
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              {this.props.topTeam.map(team => {
                return (
                  <div key={team[0]}>
                    <p>team number {team[0]}: {team[1]} points</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{getStepContent(activeStep)}</div>
              <div>
                
                {activeStep !== steps.length &&
                  (this.state.completed.has(this.state.activeStep) ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <div>
                      {(activeStep == 0 && this.props.answersOne.length > 0)? (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ): ''}

                      {(activeStep == 1 && this.props.answersTwo.length > 0)? (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ): ''}

                      {(activeStep == 2 && this.props.answersThree.length > 0)? (
                        <Button variant="contained" color="primary" onClick={this.handleComplete}>
                          {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ): ''}
                      
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
};

export default withStyles(styles)(TeamSettingsContainer)
;