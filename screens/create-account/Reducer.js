import {
  UPDATE_FIELD,
} from './Actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const reducer = (state = initialState, action) => {
  console.log('Caught in create-account: ' + JSON.stringify(action))
  switch (action.type) {
    
    case UPDATE_FIELD: 
      return {
        ...state,
        [action.field]: action.value,
      }

    default:
      return state;
  }
}

export default reducer;