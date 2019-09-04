import GameAPI from '../../apis/game';

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST'
export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE'
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS'


export const fetchGames = dispatch => async ({ authToken }) => {
  await dispatch({ type: FETCH_GAMES_REQUEST })

  let response;
  try {
    const { status, data } = response;
    response = await GameAPI.fetchGames({ authToken })
    await dispatch({ type: FETCH_GAMES_SUCCESS, status, data })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_GAMES_FAILURE,
      status,
      data,
      message,
    })
  }
}