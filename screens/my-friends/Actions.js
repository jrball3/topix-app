import FriendshipAPI from '../../apis/friendship';

export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'

export const FETCH_FR_REQUEST = 'FETCH_FR_REQUEST'
export const FETCH_FR_FAILURE = 'FETCH_FR_FAILURE'
export const FETCH_FR_SUCCESS = 'FETCH_FR_SUCCESS'

export const SEND_FR_REQUEST = 'SEND_FR_REQUEST'
export const SEND_FR_FAILURE = 'SEND_FR_FAILURE'
export const SEND_FR_SUCCESS = 'SEND_FR_SUCCESS'

export const ACCEPT_FR_REQUEST = 'ACCEPT_FR_REQUEST'
export const ACCEPT_FR_FAILURE = 'ACCEPT_FR_FAILURE'
export const ACCEPT_FR_SUCCESS = 'ACCEPT_FR_SUCCESS'

export const REJECT_FR_REQUEST = 'REJECT_FR_REQUEST'
export const REJECT_FR_FAILURE = 'REJECT_FR_FAILURE'
export const REJECT_FR_SUCCESS = 'REJECT_FR_SUCCESS'

export const fetchFriends = ({ authToken }) => async (dispatch) => {
  await dispatch({ type: FETCH_FRIENDS_REQUEST, authToken })

  try {
    const response = await FriendshipAPI.fetchFriendships({ authToken })
    const { status, data } = response;
    const { friendships } = data;
    const friends = friendships.map(a => a.friend);

    // const friends = [
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy1@verizon.net",
    //     "id": "5d77131e2acfd4013b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy1",
    //   },
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy2@verizon.net",
    //     "id": "5d77131e2acfd4023b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy2",
    //   },
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy3@verizon.net",
    //     "id": "5d77131e2acfd4033b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy3",
    //   },
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy4@verizon.net",
    //     "id": "5d77131e2acfd4043b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy4",
    //   },
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy5@verizon.net",
    //     "id": "5d77131e2acfd4053b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy5",
    //   },
    //   {
    //     "createdAt": "2019-09-10T03:06:06.826Z",
    //     "email": "someguy5withalongname@verizon.net",
    //     "id": "5d77131e2acfd4063b53fa9c",
    //     "updatedAt": "2019-09-10T03:06:06.826Z",
    //     "username": "someguy5withalongname",
    //   },
    // ]

    await dispatch({ type: FETCH_FRIENDS_SUCCESS, status, friends })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_FRIENDS_FAILURE,
      status,
      data,
      message,
    })
  }
}

export const fetchFriendRequests = ({ authToken }) => async (dispatch) => {
  await dispatch({ type: FETCH_FR_REQUEST, authToken })
  try {
    const response = await FriendshipAPI.fetchRequests({ authToken })
    const { status, data } = response;
    const { friendships } = data;

    // const friendships = [
    //   {
    //     status: 'pending',
    //     added: Date.now(),
    //     friend: {
    //       "createdAt": "2019-09-10T03:06:06.826Z",
    //       "email": "wannabefriend@verizon.net",
    //       "id": "5d77131e2acfd4063b53fa9c",
    //       "updatedAt": "2019-09-10T03:06:06.826Z",
    //       "username": "wannabefriend",
    //     }
    //   }
    // ]

    await dispatch({ 
      type: FETCH_FR_SUCCESS,
      status,
      friendRequests: friendships,
    })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_FRIENDS_FAILURE,
      status,
      data,
      message,
    })
  }
}

export const sendFriendRequest = ({ authToken, username }) => async (dispatch) => {
  await dispatch({ type: SEND_FR_REQUEST, authToken, username })
  try {
    const response = await FriendshipAPI.sendFriendRequest({ authToken, username })
    const { status } = response;
    await dispatch({ type: SEND_FR_SUCCESS, status })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: SEND_FR_FAILURE,
      status,
      data,
      message,
    })
  }
}

export const acceptFriendRequest = ({ authToken, friendshipId }) => async (dispatch) => {
  await dispatch({ type: ACCEPT_FR_REQUEST, authToken, friendshipId })
  try {
    const response = await FriendshipAPI.acceptFriendship({ authToken, friendshipId })
    const { status } = response;
    await dispatch({ type: ACCEPT_FR_SUCCESS, status })
    await dispatch(fetchFriendRequests({ authToken }))
    await dispatch(fetchFriends({ authToken }))
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: ACCEPT_FR_FAILURE,
      status,
      data,
      message,
    })
  }
}

export const rejectFriendRequest = ({ authToken, friendshipId }) => async (dispatch) => {
  await dispatch({ type: REJECT_FR_REQUEST, authToken, friendshipId })
  try {
    const response = await FriendshipAPI.rejectFriendship({ authToken, friendshipId })
    const { status } = response;
    await dispatch({ type: REJECT_FR_SUCCESS, status })
    await dispatch(fetchFriendRequests({ authToken }))
    await dispatch(fetchFriends({ authToken }))
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: REJECT_FR_FAILURE,
      status,
      data,
      message,
    })
  }
}