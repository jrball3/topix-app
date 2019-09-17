import GameAPI from '../../apis/game';
import FriendshipAPI from '../../apis/friendship';
import { NavigationActions } from 'react-navigation'


export const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
export const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const UPDATE_CREATE_GAME_FIELD = 'UPDATE_CREATE_GAME_FIELD'
export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const updateField = ({ field, value }) => dispatch => dispatch({
  type: UPDATE_CREATE_GAME_FIELD,
  field,
  value,
});

export const addPlayer = (player) => dispatch => dispatch({
  type: ADD_PLAYER,
  player,
});

export const removePlayer = (player) => dispatch => dispatch({
  type: REMOVE_PLAYER,
  player,
});

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