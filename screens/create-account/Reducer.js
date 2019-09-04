import {
  UPDATE_CREATE_FIELD,
} from './Actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case UPDATE_CREATE_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    default:
      return state;
  }
}

export default reducer;