import { combineReducers } from 'redux'
import createAccountReducer from './screens/create-account/Reducer';

const initialRoot = {};

function root(state = initialRoot, action) {
  console.log('Caught in root: ' + JSON.stringify(action))
  return state;
};

const rootReducer = combineReducers({
  root,
  createAccount: createAccountReducer,
})

export default rootReducer;