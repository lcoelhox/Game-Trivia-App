import { NEW_GAME, UPDATE_SCORE } from '../actions/index';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case NEW_GAME:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default: return state;
  }
};

export default playerReducer;
