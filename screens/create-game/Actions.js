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

export const fetchFriends = ({ authToken }) => async (dispatch) => {
  await dispatch({ type: FETCH_FRIENDS_REQUEST })
  try {
    // const createResponse = await FriendshipAPI.fetchFriendships({ authToken }) 
    // const { data } = createResponse;
    // const { friendships } = data;

    // const accepted = friendships.filter(f => f.status == 'accepted');
    // const friends = accepted.map(a => a.friend);

    const friends = [
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy1@verizon.net",
        "id": "5d77131e2acfd4013b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy1",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy2@verizon.net",
        "id": "5d77131e2acfd4023b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy2",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy3@verizon.net",
        "id": "5d77131e2acfd4033b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy3",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy4@verizon.net",
        "id": "5d77131e2acfd4043b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy4",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy5@verizon.net",
        "id": "5d77131e2acfd4053b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy5",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy5withalongname@verizon.net",
        "id": "5d77131e2acfd4063b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy5withalongname",
      },
    ]

    await dispatch({ 
      type: FETCH_FRIENDS_SUCCESS,
      friends,
    })
  }
  catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_FRIENDS_FAILURE,
      status,
      data,
      message,
    })
  }
}