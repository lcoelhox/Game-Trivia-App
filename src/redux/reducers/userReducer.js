import { NEW_GAME, USER_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
  gravatar: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
      gravatar: action.gravatar,
    };
  case NEW_GAME:
    return {
      ...state,
      email: '',
      name: '',
      gravatar: '',
    };
  default: return state;
  }
};

export default userReducer;
