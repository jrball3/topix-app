import {
  UPDATE_CREATE_ACCOUNT_FIELD,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
} from './Actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCreatingAccount: false,
  createAccountError: null,
  createAccountSuccess: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UPDATE_CREATE_ACCOUNT_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    case CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isCreatingAccount: true,
        createAccountError: null,
      }

    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isCreatingAccount: false,
        createAccountError: action.message,
        createAccountSuccess: false,
      }

    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isCreatingAccount: false,
        createAccountSuccess: true,
      }

    default:
      return state;
  }
}

export default reducer;