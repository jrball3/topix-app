import { setSession } from '../../Actions';
import AuthAPI from '../../apis/auth';
import { NavigationActions } from 'react-navigation'

export const UPDATE_AUTH_FIELD = 'UPDATE_AUTH_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_AUTH_FIELD,
    field,
    value,
  })

export const CHECK_SESSION_REQUEST = 'CHECK_SESSION_REQUEST';
export const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS';
export const CHECK_SESSION_FAILURE = 'CHECK_SESSION_FAILURE';
export const checkSession = ({ navigation, authToken }) => async dispatch => {
  await dispatch({ 
    type: CHECK_SESSION_REQUEST,
    authToken,
  });

  try {
    const checkResponse = await AuthAPI.check({ token: authToken })
    const { status, data } = checkResponse;
    await dispatch({
      type: CHECK_SESSION_SUCCESS,
      status,
      data,
      valid: true,
    });
    return navigation.dispatch(
      NavigationActions.navigate({ routeName: "My Games" })
    );
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    if (response && response.status == 401) {
      await dispatch({
        type: CHECK_SESSION_SUCCESS,
        valid: false,
        data,
        status,
        message,
      });
    } else {
      await dispatch({
        type: CHECK_SESSION_FAILURE,
        status,
        data,
        message,
      })
    }
  }
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';
export const login = ({ navigation, username, password }) => async dispatch => {
  await dispatch({
    type: LOGIN_REQUEST,
    username,
    password
  })

  try {
    const loginResponse = await AuthAPI.auth({ username, password })
    const { status, data } = loginResponse;
    const { token: authToken } = data;

    await dispatch({
      type: LOGIN_REQUEST_SUCCESS,
      status,
      authToken,
      valid: true,
    })

    const session = {
      username,
      authToken,
    }
  
    await dispatch(setSession({ session }));

    return navigation.dispatch(
      NavigationActions.navigate({ routeName: "My Games" })
    );
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    if (response) {
      await dispatch({
        type: LOGIN_REQUEST_FAILURE,
        status,
        data,
        message,
      })
    }
  }
};