import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { name, gravatar, score } = this.props;
    return (
      <header>
        <div>
          <img
            src={ gravatar }
            alt="user gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
        </div>
        <div>
          <p data-testid="header-score">{score}</p>
        </div>
        <Link data-testid="btn-settings" to="/settings">Configurações</Link>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, player }) => ({
  name: user.name,
  gravatar: user.gravatar,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
