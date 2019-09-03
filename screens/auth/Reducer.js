import {
  UPDATE_FIELD,
  CHECK_SESSION_REQUEST,
  CHECK_SESSION_FAILURE,
  CHECK_SESSION_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
} from './Actions';

const initialState = {
  username: null,
  password: null,
  authToken: null,
  checkingSession: false,
  sessionChecked: false,
  needLogin: true,
  loggingIn: false,
  loggedIn: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    case CHECK_SESSION_REQUEST: 
      return {
        ...state,
        checkingSession: true,
      }

    case CHECK_SESSION_FAILURE:
      return {
        ...state,
        checkingSession: false,
        sessionChecked: true,
        needLogin: true,
      }

    case CHECK_SESSION_SUCCESS:
      return {
        ...state,
        checkingSession: false,
        sessionChecked: true,
        needLogin: !action.valid,
        loggedIn: action.valid,
      }
    
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      }

    case LOGIN_REQUEST_FAILURE: 
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
      }
    
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: action.valid,
      }

    default:
      return state;
  }
}

export default reducer;