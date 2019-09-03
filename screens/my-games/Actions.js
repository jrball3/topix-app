import GameApi from '../../apis/game';

export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST'
export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE'
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS'


export const fetchGames = dispatch => async ({ authToken }) => {
  await dispatch({ type: FETCH_GAMES_REQUEST })

  let response;
  try {
    const { status, data } = response;
    response = await GameApi.fetchGames({ authToken })
    await dispatch({ type: FETCH_GAMES_SUCCESS, status, data })
  } catch (error) {
    const { response } = error;
    const { status, data } = response;
    await dispatch({ 
      type: FETCH_GAMES_FAILURE,
      status,
      data,
    })
  }
}