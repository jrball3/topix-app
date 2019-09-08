import PostAPI from '../../apis/post';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'


export const fetchPosts = ({ authToken, gameId }) => async (dispatch) => {
  await dispatch({ type: FETCH_POSTS_REQUEST, authToken, gameId })

  try {
    const response = await PostAPI.fetchPosts({ authToken, gameId })
    const { status, data } = response;
    const { posts } = data;
    await dispatch({ 
      type: FETCH_POSTS_SUCCESS,
      authToken,
      gameId,
      status,
      posts
    })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_POSTS_FAILURE,
      authToken,
      gameId,
      status,
      data,
      message,
    })
  }
}

export const createPost = ({ authToken, gameId, message }) => async (dispatch) => {
  await dispatch({ type: CREATE_POST_REQUEST, authToken, gameId, message })

  try {
    const response = await PostAPI.createPost({ authToken, gameId, message })
    const { data } = response;
    const { post } = data;
    await dispatch({ 
      type: CREATE_POST_SUCCESS, 
      authToken,
      gameId,
      message,
      post,
    })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: CREATE_POST_FAILURE,
      gameId,
      status,
      data,
      message,
    })
  }
}