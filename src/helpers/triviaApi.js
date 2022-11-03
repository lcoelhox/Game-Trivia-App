export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchQuestions = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
