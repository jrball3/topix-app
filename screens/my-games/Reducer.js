import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingGames: false,
  fetchingGamesFailure: false,
  fetchingGamesSuccess: false,
  fetchingGamesError: null,
  games: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        isFetchingGames: true,
      }
    
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        isFetchingGames: false,
        fetchingGamesSuccess: false,
        fetchingGamesFailure: true,
        fetchingGamesError: action.error,
      }

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isFetchingGames: false,
        fetchingGamesSuccess: true,
        fetchingGamesFailure: false,
        fetchingGamesError: null,
      }
    
    default:
      return state;
  }
}

export default reducer;