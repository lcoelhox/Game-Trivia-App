import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore, countAnswered } from '../redux/actions';
import './Question.css';

const RANDOM = 0.5;
const ONE_SECOND = 1000;

class Question extends Component {
  state = {
    answered: false,
    timer: 30,
    isDisable: false,
    answers: [],
  };

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    const { timer } = this.state;
    if (timer === 1) {
      clearInterval(this.intervalID);
      this.setState({
        isDisable: true,
        timer: 30,
      });
    }
    if (question.question !== prevProps.question.question) {
      this.setState({
        answered: false,
        timer: 30,
        isDisable: false,
        answers: [...question.incorrect_answers, question.correct_answer]
          .sort(() => RANDOM - Math.random()),
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  checkAnswer = (answer) => {
    const { question, dispatch } = this.props;
    const { timer, answered } = this.state;
    const level = { hard: 3, medium: 2, easy: 1 };
    if (!answered && answer === question.correct_answer) {
      dispatch(updateScore(timer, level[question.difficulty]));
    }
    if (!answered) {
      dispatch(countAnswered());
    }
    this.setState({
      answered: true,
    });
  };

  render() {
    const { question } = this.props;
    const { isDisable, answered, answers } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">
          {question && question.category}
        </h3>
        <p data-testid="question-text">
          {question && question.question}
        </p>
        {answers.length > 0 && (
          <div data-testid="answer-options">
            { answers.map((answer, index) => {
              const isCorrect = answer === question.correct_answer;
              const correctness = isCorrect ? 'correct' : 'wrong';
              return (
                <button
                  key={ index }
                  type="button"
                  className={ answered ? correctness : 'not-answered' }
                  onClick={ () => this.checkAnswer(answer) }
                  data-testid={ isCorrect ? 'correct-answer' : 'wrong-answer' }
                  disabled={ isDisable }
                >
                  {answer}
                </button>
              );
            })}
          </div>
        ) }
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.shape(),
};

Question.defaultProps = {
  question: {
    incorrect_answers: [],
  },
};

export default connect()(Question);
