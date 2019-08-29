import { selectState } from './Helpers';

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const updateField = ({ field, value }) => (dispatch, getState) => {
  console.log(`updateField [${field} = ${value}]`)
  return {
    type: UPDATE_FIELD,
    field,
    value,
  }
}

export const createAccount = () => (dispatch, getState) => {
  console.log('Account created!')
  console.log(selectState(getState()))
}