import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from "../App";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { questionsResponse } from '../../cypress/mocks/questions';

describe('Testa o componente question', () => {
  jest.setTimeout(35000);

  it('Testa se o botão é desabilitado após 30 segundos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    renderWithRouterAndRedux(<App />, {}, '/game');
    
    await new Promise((test) => setTimeout(test, 30000));
    const answerButton = screen.getByTestId('correct-answer');
    expect(answerButton).toBeDisabled();
  });
});