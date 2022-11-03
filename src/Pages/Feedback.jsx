import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { newGame } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { user, player } = this.props;
    this.saveToRanking({
      name: user.name,
      score: player.score,
      picture: user.gravatar,
    });
  }

  handlePlayAgainClick = () => {
    const { history, dispatch } = this.props;
    dispatch(newGame());
    history.push('/');
  };

  handleRankingClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  saveToRanking = (player) => {
    const currentRanking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...currentRanking || [], player]));
  };

  render() {
    const { player } = this.props;
    const goodScore = 3;
    return (
      <div data-testid="feedback-page">
        <Header />
        <h1>pagina de feedback</h1>
        <h3 data-testid="feedback-total-score">{player.score}</h3>
        <p data-testid="feedback-text">
          { player.assertions < goodScore ? 'Could be better...' : 'Well Done!' }
        </p>
        <p>
          {'Acertou: '}
        </p>
        <p data-testid="feedback-total-question">{player.assertions}</p>
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgainClick }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="submit"
          onClick={ this.handleRankingClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    gravatar: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player, user }) => ({
  player,
  user,
});

export default connect(mapStateToProps)(Feedback);
