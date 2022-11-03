import md5 from 'crypto-js/md5';

export const USER_LOGIN = 'USER_LOGIN';
export const FAIL_FECTH = 'FAIL_FECTH';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const NEXT_ROUND = 'NEXT_ROUND';
export const COUNT_ANSWERED = 'COUNT_ANSWERED';
export const NEW_GAME = 'NEW_GAME';

export const userLogin = ({ name, email }) => {
  const userData = md5(email).toString();
  return {
    type: USER_LOGIN,
    name,
    email,
    gravatar: `https://www.gravatar.com/avatar/${userData}`,
  };
};

export const failFecth = (error) => ({
  type: FAIL_FECTH,
  error,
});

export const updateScore = (timer, level) => {
  const valuesoma = 10;
  return {
    type: UPDATE_SCORE,
    score: valuesoma + timer * level,
  };
};

export const nextRound = () => ({
  type: NEXT_ROUND,
});

export const countAnswered = () => ({
  type: COUNT_ANSWERED,
});

export const newGame = () => ({
  type: NEW_GAME,
});
