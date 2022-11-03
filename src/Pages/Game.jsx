import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchQuestions } from '../helpers/triviaApi';
import Question from '../components/Question';
import { nextRound } from '../redux/actions';

const ERROR_CODE = 3;
class GamePage extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    const data = await fetchQuestions(tokenLocalStorage);
    if (data.response_code === ERROR_CODE) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      this.setState({
        questions: data.results,
      });
    }
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  dispatchNextRound = () => {
    const { dispatch } = this.props;
    dispatch(nextRound());
  };

  render() {
    const maxRounds = 5;
    const { questions } = this.state;
    const { game } = this.props;
    return (
      <>
        { game.round >= maxRounds && <Redirect to="/feedback" /> }
        <Header />
        <section>
          {questions && (
            <Question
              question={ questions[game.round] }
            />
          )}
        </section>
        { game.countAnswered > game.round && (
          <button
            type="button"
            onClick={ () => this.dispatchNextRound() }
            data-testid="btn-next"
          >
            Next
          </button>
        )}
      </>
    );
  }
}

GamePage.propTypes = {
  game: PropTypes.shape({
    round: PropTypes.number.isRequired,
    countAnswered: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ game }) => ({
  game,
});

export default connect(mapStateToProps)(GamePage);
