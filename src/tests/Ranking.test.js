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

window.localStorage.setItem(
  "ranking",
  JSON.stringify([
    {
      name: "Player 1",
      score: 150,
      picture: "https://www.gravatar.com/avatar/1",
    },
    {
      name: "Player 2",
      score: 100,
      picture: "https://www.gravatar.com/avatar/2",
    },
    {
      name: "Player 3",
      score: 50,
      picture: "https://www.gravatar.com/avatar/3",
    },
  ])
);

describe("Testando pagina de Ranking", () => {
  it("testando se a pagina de ranking contem os elementos", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, "/ranking");
    const rankingTitle = screen.getByTestId("ranking-title");
    expect(rankingTitle).toBeInTheDocument();
  });

  it("testando se a pagina de ranking renderizou os jogadores", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, "/ranking");
    const rankingPlayer = screen.getAllByTestId("ranking-player");
    expect(rankingPlayer).toHaveLength(3);
  });

  it("testando se ao clicar no button:Go Home leva para a pagina inicial", () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, "/ranking");
    const buttonGoHome = screen.getByTestId("btn-go-home");
    userEvent.click(buttonGoHome);
    expect(window.location.pathname).toBe("/");
  });
});
