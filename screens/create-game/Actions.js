import GameAPI from '../../apis/game';
import { NavigationActions } from 'react-navigation'

export const UPDATE_CREATE_GAME_FIELD = 'UPDATE_CREATE_GAME_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_CREATE_GAME_FIELD,
    field,
    value,
  })

const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';
const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';

export const createGame = ({ 
  navigation,
  authToken,
  gameName,
  gameType,
  players,
}) => async (dispatch) => {
  await dispatch({ type: CREATE_GAME_REQUEST })
  try {
    const createResponse = await GameAPI.createGame({ 
      authToken,
      name: gameName,
      type: gameType,
      players,
    })
    const { data } = createResponse;
    await dispatch({ 
      type: CREATE_GAME_SUCCESS,
      gameName,
      gameType,
      players, 
      data,
    })
    return navigation.dispatch(
      NavigationActions.navigate({ routeName: "My Games" })
    );
  }
  catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: CREATE_GAME_FAILURE,
      status,
      data,
      message,
    })
  }
}