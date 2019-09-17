import {
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_FAILURE,
  FETCH_FRIENDS_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingFriends: false,
  fetchingFriendsFailure: false,
  fetchingFriendsSuccess: false,
  fetchingFriendsError: null,
  friends: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        isFetchingFriends: true,
      }
    
    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        isFetchingFriends: false,
        fetchingFriendsSuccess: false,
        fetchingFriendsFailure: true,
        fetchingFriendsError: action.error,
      }

    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetchingFriends: false,
        fetchingFriendsSuccess: true,
        fetchingFriendsFailure: false,
        fetchingFriendsError: null,
        friends: action.friends,
      }
    
    default:
      return state;
  }
}

export default reducer;