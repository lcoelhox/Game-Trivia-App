import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve("token"),
  });

const INITIAL_STATE = {
  player: {
    name: "Player 1",
    assertions: 2,
    score: 150,
  },
};

const ROUTE = "/feedback";

describe("Testando pagina de Feedback", () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn((key) => {
        if (key === "ranking") {
          return JSON.stringify([]);
        }
        if ("token") {
          return JSON.stringify(
            "524bb7db48f0c7f215ad42a82bb4b0426709982f8237238d706a94a42a08d865"
          );
        }
      }),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
  });

  it("testando se a pagina de feedback contem os elementos", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const feedbackPage = screen.getByTestId("feedback-page");
    const feedbackText = screen.getByTestId("feedback-text");
    const feedbackTotalScore = screen.getByTestId("feedback-total-score");
    const feedbackTotalQuestion = screen.getByTestId("feedback-total-question");
    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    const buttonRanking = screen.getByTestId("btn-ranking");
    expect(feedbackPage).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(buttonPlayAgain).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();
  });

  it("testando se o botao de jogar novamente leva para a pagina de jogo", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const buttonPlayAgain = screen.getByTestId("btn-play-again");
    userEvent.click(buttonPlayAgain);
    expect(window.location.pathname).toBe("/");
  });

  it("testando se o botao de ranking leva para a pagina de ranking", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const buttonRanking = screen.getByTestId("btn-ranking");
    userEvent.click(buttonRanking);
    expect(window.location.pathname).toBe("/");
  });

  it("testando se ao acertar somente menos de 3 questoes o feedback é 'Could be better...'", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
    const feedbackText = screen.getByTestId("feedback-text");
    expect(feedbackText.innerHTML).toBe("Could be better...");
  });

  it("testando se ao acertar mais de 3 questoes o feedback é 'Mandou bem!'", () => {
    const newInitialStateWith4Assertions = {
      player: {
        ...INITIAL_STATE.player,
        assertions: 4,
      },
    };
    renderWithRouterAndRedux(<App />, newInitialStateWith4Assertions, ROUTE);
    const feedbackText = screen.getByTestId("feedback-text");
    expect(feedbackText.innerHTML).toBe("Well Done!");
  });
});
