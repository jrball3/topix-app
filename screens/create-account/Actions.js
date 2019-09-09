import UserAPI from '../../apis/user';
import { NavigationActions } from 'react-navigation'

export const UPDATE_CREATE_ACCOUNT_FIELD = 'UPDATE_CREATE_ACCOUNT_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_CREATE_ACCOUNT_FIELD,
    field,
    value,
  })

const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';
const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';

export const createAccount = ({ 
  navigation,
  username,
  password,
  email,
}) => async (dispatch) => {
  await dispatch({ type: CREATE_ACCOUNT_REQUEST, username, password, email })
  try {
    const createResponse = await UserAPI.createAccount({ username, password, email })
    const { data } = createResponse;
    await dispatch({ 
      type: CREATE_ACCOUNT_SUCCESS,
      username,
      password,
      email, 
      data,
    })
    navigation.navigate("Auth")
  }
  catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: CREATE_ACCOUNT_FAILURE,
      status,
      data,
      message,
    })
  }
}