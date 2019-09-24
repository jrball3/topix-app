import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_FAILURE,
  FETCH_GAMES_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingGames: false,
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
        fetchingGamesError: null,
      }
    
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        isFetchingGames: false,
        fetchingGamesSuccess: false,
        fetchingGamesError: action.message,
      }

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isFetchingGames: false,
        fetchingGamesSuccess: true,
        games: action.games,
      }
    
    default:
      return state;
  }
}

export default reducer;