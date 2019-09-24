import {
  UPDATE_CREATE_GAME_FIELD,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILURE,
  ADD_PLAYER,
  REMOVE_PLAYER,
} from './Actions';

const initialState = {
  gameName: '',
  gameType: 'KARMA_HOLE',
  players: [],
  friends: [],
  isCreatingGame: false,
  gameCreationError: null,
  gameCreationSuccess: false,
  isFetchingFriends: false,
  friendFetchingError: null,
  friendFetchingSuccess: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UPDATE_CREATE_GAME_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      }

    case REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(p => p.id !== action.player.id),
      }

    case CREATE_GAME_REQUEST:
      return {
        ...state,
        isCreatingGame: true,
        gameCreationError: null,
      }

    case CREATE_GAME_FAILURE:
      return {
        ...state,
        isCreatingGame: false,
        gameCreationError: action.message,
      }
    
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        isCreatingGame: false,
        gameCreationSuccess: true,
      }

    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        isFetchingFriends: true,
        friendFetchingError: null,
      }

    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        isFetchingFriends: false,
        friendFetchingError: action.message,
        friendFetchingSuccess: false,
      }

    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetchingFriends: false,
        friendFetchingSuccess: true,
        friends: action.friends || [],
      }

    default:
      return state;
  }
}

export default reducer;