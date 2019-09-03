export const SET_SESSION = 'SET_SESSION';

export const setSession = ({ username, authToken }) => dispatch => (
  dispatch({
    type: SET_SESSION,
    session: {
      username,
      authToken,
    },
  })
)
