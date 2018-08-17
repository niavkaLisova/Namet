import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"

const questions = [
  {text: '"Коли з гори Кіліманджаро біжить залізний носоріг, тоді з гори Кіліманджаро біжить залізний носоріг"', team: 0},
  {text: '"Битися до кінця властиво всім, хто має серце. Бо кому ж, як не серцю, це властиво первинно"', team:2},
]

@connect((store, ownProps) => {
  return {
  };
})
export default class StepThree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      questions: questions,
      answersLength: 7
    }
  }
  

  handleSelectOption = item => {
    if (this.state.answers.length <= this.state.answersLength) {
      let newAnswers = this.state.answers;
      newAnswers.push(item);

      let newQuestions = this.state.questions.filter(elem => elem.text != item.text);

      this.setState({
        answers: newAnswers,
        questions: newQuestions
      });
      
      this.props.dispatch(UserActions.saveAnswersThree(newAnswers));
    }
  }

  handleReturnOption = item => {
    let newQuestions = this.state.questions;
    newQuestions.push(item);

    let newAnswers = this.state.answers.filter(elem => elem.text != item.text);

    this.setState({
      answers: newAnswers,
      questions: newQuestions
    })

    this.props.dispatch(UserActions.saveAnswersThree(newAnswers));
  }

  render() {
    return (
      <div>
        <h3>Оберіть вірші, що здаються вам найбільш геніальними (хоч вони усі, без сумніву, геніальні)</h3>
          <div>
            {this.state.questions.map((item, index) => {
              return (
                <div key={index}>
                  <p onClick={() => this.handleSelectOption(item)}>{item.text}</p>
                </div>
                )
            })}
          </div>
          <hr />
          <div>
            {this.state.answers.map((item, index) => {
              return (
                <div key={index}>
                  <p onClick={() => this.handleReturnOption(item)}>{item.text}</p>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
};

