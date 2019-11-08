import {
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_FAILURE,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FR_REQUEST,
  FETCH_FR_FAILURE,
  FETCH_FR_SUCCESS,
  SEND_FR_REQUEST,
  SEND_FR_FAILURE,
  SEND_FR_SUCCESS,
  ACCEPT_FR_FAILURE,
  ACCEPT_FR_REQUEST,
  ACCEPT_FR_SUCCESS,
  REJECT_FR_FAILURE,
  REJECT_FR_REQUEST,
  REJECT_FR_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingFriends: false,
  fetchingFriendsSuccess: false,
  fetchingFriendsError: null,
  isFetchingFR: false,
  fetchFRSuccess: true,
  fetchFRError: null,
  isSendingFR: false,
  sendFRSuccess: false,
  sendFRError: null,
  isAcceptingFR: false,
  acceptFRSuccess: false,
  acceptFRError: null,
  isRejectingFR: false,
  rejectFRSuccess: false,
  rejectFRError: null,
  friends: [],
  friendRequests: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        isFetchingFriends: true,
        fetchingFriendsError: null,
      }
    
    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        isFetchingFriends: false,
        fetchingFriendsSuccess: false,
        fetchingFriendsError: action.message,
      }

    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetchingFriends: false,
        fetchingFriendsSuccess: true,
        friends: action.friends,
      }

    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        isFetchingFR: true,
        fetchFRError: null,
      }

    case FETCH_FR_FAILURE:
        return {
          ...state,
          isFetchingFR: false,
          fetchFRError: action.message,
          fetchFRSuccess: false,
        }

    case FETCH_FR_SUCCESS:
      return {
        ...state,
        isFetchingFR: false,
        fetchFRSuccess: true,
        friendRequests: action.friendRequests,
      }

    case SEND_FR_REQUEST:
      return {
        ...state,
        isSendingFR: true,
        sendFRError: null,
      }

    case SEND_FR_FAILURE:
      return {
        ...state,
        isSendingFR: false,
        sendFRError: action.message,
        sendFRSuccess: false,
      }

    case SEND_FR_SUCCESS: 
      return {
        ...state,
        isSendingFR: false,
        sendFRSuccess: true,
      }

    case ACCEPT_FR_REQUEST:
      return {
        ...state,
        isAcceptingFR: true,
        acceptFRError: null,
      }

    case ACCEPT_FR_FAILURE:
      return {
        ...state,
        isAcceptingFR: false,
        acceptFRError: action.message,
        acceptFRSuccess: false,
      }

    case ACCEPT_FR_SUCCESS:
      return {
        ...state,
        isAcceptingFR: false,
        acceptFRSuccess: true,
      }

    case ACCEPT_FR_REQUEST:
      return {
        ...state,
        isAcceptingFR: true,
        acceptFRError: null,
      }

    case ACCEPT_FR_FAILURE:
      return {
        ...state,
        isAcceptingFR: false,
        acceptFRError: action.message,
        acceptFRSuccess: false,
      }

    case ACCEPT_FR_SUCCESS:
      return {
        ...state,
        isAcceptingFR: false,
        acceptFRSuccess: true,
      }

    case REJECT_FR_REQUEST:
      return {
        ...state,
        isRejectingFR: true,
        rejectFRError: null,
      }
    
    case REJECT_FR_FAILURE:
      return {
        ...state,
        isRejectingFR: false,
        rejectFRError: action.message,
        rejectFRSuccess: false,
      }

    case REJECT_FR_SUCCESS:
      return {
        ...state,
        isRejectingFR: false,
        rejectFRSuccess: true,
      }

    default:
      return state;
  }
}

export default reducer;