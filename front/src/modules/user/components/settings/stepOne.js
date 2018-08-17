import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"

const questions = [
  {text: 'На Лисій горі в Караганді', team: 0},
  {text: 'У променях слави, на п\'єдесталі, при врученні золотої медалі', team: 1},
  {text: 'Я всюди почуваюсь досить добре і спокійно', team:2},
  {text: 'Над травою піднімається фіолетовий туман; я знаю все у цьому лісі. Тут мені накраще', team: 3},
  {text: 'Міст між сном і реальністю', team: 4},
  {text: 'У своїй кімнаті', team: 5},
  {text: 'Після дових запилених доріг нарешті на бруківці свого міста, між кам\'яних будинків', team: 6}
]

@connect((store, ownProps) => {
  return {
  };
})
export default class StepOne extends React.Component {
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

      this.props.dispatch(UserActions.saveAnswersOne(newAnswers));
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

    this.props.dispatch(UserActions.saveAnswersOne(newAnswers));
  }

  render() {
    return (
      <div>
        <h3>Де ви почуваєтеся, як риба в воді?</h3>
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

