import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;
