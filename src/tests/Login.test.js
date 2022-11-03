import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve('token'),
});

describe('Testando pagina de Login', () => {
  it('Deve redirecionar para /settings ao clicar em configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-settings');
    userEvent.click(button);
    expect(history.location.pathname).toContain('/settings');
  });

  it('Deve invalidar o botão Play se nome não for fornecido', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    userEvent.type(email, 'email@dominio.com');
    expect(button.disabled).toBe(true);
  });

  it('Deve invalidar o botão Play se email não for válido', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');
    userEvent.type(name, 'João Ninguem');
    expect(button.disabled).toBe(true);
  });

  it('Deve redirecionar para /game ao clicar no botão Play', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    userEvent.type(name, 'João Ninguem');
    userEvent.type(email, 'email@dominio.com');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    await waitFor(() => expect(history.location.pathname).toContain('/game'));
  });
});