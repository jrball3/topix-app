import UserAPI from '../../apis/user';
import { NavigationActions } from 'react-navigation'

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_FIELD,
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
  // const api = new UserAPI()
  // return api.createAccount({ username, password, email })
  //   .then(async (response) => {
  //     const { data } = response;
      await dispatch({ 
        type: CREATE_ACCOUNT_SUCCESS,
        username,
        password,
        email, 
        // data,
      })
      // return navigation.dispatch(
      //   NavigationActions.navigate({ routeName: "Dashboard" })
      // );

    // })
    // .catch((error) => {
    //   const { response } = error;
    //   const { status, data } = response;
    //   dispatch({ 
    //     type: CREATE_ACCOUNT_FAILURE,
    //     username,
    //     password,
    //     email,
    //     status,
    //     data,
    //   })
    // })
}