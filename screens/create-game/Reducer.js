import {
  UPDATE_CREATE_GAME_FIELD,
} from './Actions';

const initialState = {
  gameName: '',
  gameType: 'Karma Hole',
  players: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UPDATE_CREATE_GAME_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    default:
      return state;
  }
}

export default reducer;