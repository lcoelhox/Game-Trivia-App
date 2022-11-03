import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../helpers/triviaApi';
import { userLogin } from '../redux/actions';

class Login extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    isDisabled: true,
  };

  redirectToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  fetchButtonSubmit = async (event) => {
    const { history, dispatch } = this.props;
    const { nameInput, emailInput } = this.state;
    event.preventDefault();
    const response = await fetchToken();
    localStorage.setItem('token', response.token);
    dispatch(userLogin({ name: nameInput, email: emailInput }));
    history.push('/game');
  };

  checkButton = () => {
    const { nameInput, emailInput } = this.state;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;

    const check = [
      nameInput.length > 0,
      emailInput.length > 0,
      validator.test(emailInput),
    ];

    if (check.every((item) => item === true)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  changeHandler = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.checkButton);
  };

  render() {
    const { nameInput, emailInput, isDisabled } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectToSettings }
        >
          Configurações
        </button>
        <form className="login-container">
          <label htmlFor="nameInput">
            <p>Nome</p>
            <input
              type="text"
              name="nameInput"
              id="nameInput"
              value={ nameInput }
              data-testid="input-player-name"
              onChange={ this.changeHandler }
            />
          </label>
          <label htmlFor="emailInput">
            <p>Email</p>
            <input
              type="text"
              name="emailInput"
              id="emailInput"
              value={ emailInput }
              data-testid="input-gravatar-email"
              onChange={ this.changeHandler }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.fetchButtonSubmit }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
