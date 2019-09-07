import PostAPI from '../../apis/post';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'


export const fetchPosts = ({ authToken, gameId }) => async (dispatch) => {
  await dispatch({ type: FETCH_POSTS_REQUEST, authToken, gameId })

  try {
    const response = await PostAPI.fetchPosts({ authToken, gameId })
    const { status, data } = response;
    const { posts } = data;
    await dispatch({ type: FETCH_POSTS_SUCCESS, status, posts })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_POSTS_FAILURE,
      status,
      data,
      message,
    })
  }
}