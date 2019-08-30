export const UPDATE_FIELD = 'UPDATE_FIELD'
export const updateField = ({ field, value }) => 
  (dispatch) => dispatch({
    type: UPDATE_FIELD,
    field,
    value,
  })

export const createAccount = () => 
  (dispatch, getState) => dispatch({ type: 'CREATE_ACCOUNT' })