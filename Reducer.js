import { combineReducers } from 'redux'
import createAccountReducer from './screens/create-account/Reducer';
import authReducer from './screens/auth/Reducer';
import createGameReducer from './screens/create-game/Reducer';
import myGamesReducer from './screens/my-games/Reducer';
import { SET_SESSION } from './Actions';

const initialRoot = {
  session: {
    authToken: '',
  },
};

function root(state = initialRoot, action) {
  console.log('Caught in root: ' + JSON.stringify(action))
  switch ( action.type ) {

    case SET_SESSION:
      return ({
        ...state,
        session: action.session,
      })

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  root,
  auth: authReducer,
  createAccount: createAccountReducer,
  createGame: createGameReducer,
  myGames: myGamesReducer,
})

export default rootReducer;