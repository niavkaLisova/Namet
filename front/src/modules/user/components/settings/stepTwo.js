import React from 'react';

import * as UserActions from '../../actions/user-actions'

import { connect } from "react-redux"

const questions = [
  {text: 'Збирати гриби; Гриби мені найбільш близькі', team: 0},
  {text: 'Бухати і курити', team: 0},
  {text: 'Поезія', team: 1},
  {text: 'Шукати справедливість і боротися за правду', team:2},
  {text: 'Дискусії і боротьба', team:2},
  {text: 'Я спостерігаю за ростом трави; це головне для мене. Минала гра тіней і світла в листках, це було щось тихе, велике й зелене', team: 3},
  {text: 'Роблю човники з трави', team: 3},
  {text: 'Музика яка звучить у тиші', team: 3},
  {text: 'Казки білого дня', team: 3},
  {text: 'Відчуття вільного падіння', team: 4},
  {text: 'Казки на ніч (казки ночі)', team: 4},
  {text: 'Я люблю відпочивати і люблю розважатися', team: 5},
  {text: 'Я люблю дивитися на це місто з висоти: з ратуші чи з дирижабля. В обідню спеку, коли сонце низько над горизонтом, в темряві ночі', team: 6}
]

@connect((store, ownProps) => {
  return {
    user: store.user
  };
})
export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      questions: questions,
      answersLength: 7
    }
  }
  

  handleSelectOption = item => {
    if (this.state.answers.length < this.state.answersLength) {
      let newAnswers = this.state.answers;
      newAnswers.push(item);

      let newQuestions = this.state.questions.filter(elem => elem.text != item.text);

      this.setState({
        answers: newAnswers,
        questions: newQuestions
      });

      this.props.dispatch(UserActions.saveAnswersTwo(newAnswers));
    }
  }

  handleReturnOtrion = item => {
    let newQuestions = this.state.questions;
    newQuestions.push(item);

    let newAnswers = this.state.answers.filter(elem => elem.text != item.text);

    this.setState({
      answers: newAnswers,
      questions: newQuestions
    })

    this.props.dispatch(UserActions.saveAnswersTwo(newAnswers));
  }

  render() {
    return (
      <div>
        <h3>Що ви найбільше любите робити? Що вам найбільш близьке?</h3>
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

