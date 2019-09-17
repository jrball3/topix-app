import FriendshipAPI from '../../apis/friendship';

export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST'
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE'
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'

export const fetchFriends = ({ authToken }) => async (dispatch) => {
  await dispatch({ type: FETCH_FRIENDS_REQUEST, authToken })

  try {
    const response = await FriendshipAPI.fetchFriendships({ authToken })
    const { status, data } = response;
    const { friendships } = data;
    const accepted = friendships.filter(f => f.status == 'accepted');
    // const friends = accepted.map(a => a.friend);

    const friends = [
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy1@verizon.net",
        "id": "5d77131e2acfd4013b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy1",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy2@verizon.net",
        "id": "5d77131e2acfd4023b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy2",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy3@verizon.net",
        "id": "5d77131e2acfd4033b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy3",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy4@verizon.net",
        "id": "5d77131e2acfd4043b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy4",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy5@verizon.net",
        "id": "5d77131e2acfd4053b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy5",
      },
      {
        "createdAt": "2019-09-10T03:06:06.826Z",
        "email": "someguy5withalongname@verizon.net",
        "id": "5d77131e2acfd4063b53fa9c",
        "updatedAt": "2019-09-10T03:06:06.826Z",
        "username": "someguy5withalongname",
      },
    ]

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