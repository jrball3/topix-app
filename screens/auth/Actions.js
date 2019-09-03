import { setSession } from '../../Actions';

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_FIELD,
    field,
    value,
  })

export const CHECK_SESSION_REQUEST = 'CHECK_SESSION_REQUEST';
export const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS';
export const CHECK_SESSION_FAILURE = 'CHECK_SESSION_FAILURE';
export const checkSession = ({ authToken }) => async dispatch => {
  await dispatch({ 
    type: CHECK_SESSION_REQUEST,
    authToken,
  });

  // TODO: Check session request to api
  const valid = false;

  await dispatch({
    type: CHECK_SESSION_SUCCESS,
    valid,
  });
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';
export const login = ({ username, password }) => async dispatch => {
  await dispatch({
    type: LOGIN_REQUEST,
    username,
    password
  })

  // TODO: Login request to api
  const authToken = 'fakeToken';

  await dispatch({
    type: LOGIN_REQUEST_SUCCESS,
    authToken,
  })

  await dispatch(setSession({
    username,
    authToken,
  }));
};