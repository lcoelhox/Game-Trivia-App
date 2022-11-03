import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import { invalidTokenResponse } from '../../cypress/mocks/token';
import userEvent from '@testing-library/user-event';
import { questionsResponse } from '../../cypress/mocks/questions';


describe('Testa a página GamePage', () => {
  it('Testa se um token inválido redireciona para a página inicial', async () => {
    renderWithRouterAndRedux(<App />, {}, '/game');

    const setTokenLocalStorage = window.localStorage.setItem('token', invalidTokenResponse.token);

    await waitFor(() => {
      const inputHome = screen.getByTestId('input-player-name');
      expect(inputHome).toBeInTheDocument();
    })
  });

  test('Testa o botão Next', async () => {
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => {
      const answerButton = screen.getByTestId('correct-answer');
      userEvent.click(answerButton);

      const nextButton = screen.getByTestId('btn-next');
      userEvent.click(nextButton);
    })
   })

   test('Testa se ao final do jogo é redirecionado para a página de feedback', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, {}, '/game');

    const answerButton = await screen.findByTestId('correct-answer');
    userEvent.click(answerButton);
    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);

    const answerButton2 = await screen.findByTestId('correct-answer');
    userEvent.click(answerButton2);
    const nextButton2 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton2);

    const answerButton3 = await screen.findByTestId('correct-answer');
    userEvent.click(answerButton3);
    const nextButton3 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton3);

    const answerButton4 = await screen.findByTestId('correct-answer');
    userEvent.click(answerButton4);
    const nextButton4 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton4);

    const answerButton5 = await screen.findByTestId('correct-answer');
    userEvent.click(answerButton5);
    const nextButton5 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton5);
    userEvent.click(nextButton5);

    const feedbackTitle = screen.getByRole('heading', { name: 'pagina de feedback' });
    expect(feedbackTitle).toBeInTheDocument();
   })
});
