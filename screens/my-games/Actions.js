import GameAPI from '../../apis/game';

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST'
export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE'
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS'


export const fetchGames = ({ authToken }) => async (dispatch) => {
  await dispatch({ type: FETCH_GAMES_REQUEST, authToken })

  try {
    const response = await GameAPI.fetchGames({ authToken })
    const { status, data } = response;
    const { games } = data;
    await dispatch({ type: FETCH_GAMES_SUCCESS, status, games })
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