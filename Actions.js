import { AsyncStorage } from 'react-native';
import { getSessionStore } from './Helpers';

export const SET_SESSION = 'SET_SESSION';

export const setSession = ({ session, store = true }) => async (dispatch) => {
  await dispatch({
    type: SET_SESSION,
    session,
  })
  if (store) {
    console.log('Storing session...')
    const toStore = {
      ...session,
      storedAt: Date.now(),
    }
    try {
      await AsyncStorage.setItem(getSessionStore(), JSON.stringify(toStore));
      console.log('Session stored.')
    } catch (error) {
      console.error('Error storing session')
      console.error(error)
    }
  }
}
