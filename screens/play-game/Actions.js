import PostAPI from '../../apis/post';
import ScoreAPI from '../../apis/score';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export const FETCH_SCORES_REQUEST = 'FETCH_SCORES_REQUEST'
export const FETCH_SCORES_FAILURE = 'FETCH_SCORES_FAILURE'
export const FETCH_SCORES_SUCCESS = 'FETCH_SCORES_SUCCESS'

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

export const fetchScores = ({ authToken, gameId }) => async (dispatch) => {
  await dispatch({ type: FETCH_SCORES_REQUEST, authToken, gameId })

  try {
    const response = await ScoreAPI.fetchScores({ authToken, gameId })
    const { status, data } = response;
    const { scores } = data;
    await dispatch({
      type: FETCH_SCORES_SUCCESS,
      authToken,
      gameId,
      status,
      scores,
    })
  } catch (error) {
    const { response, message } = error;
    const status = response && response.status;
    const data = response && response.data;
    await dispatch({
      type: FETCH_SCORES_FAILURE,
      authToken,
      gameId,
      status,
      data,
      message,
    })
  }
}

export const SELECT_GAME = 'SELECT_GAME';

export const selectGame = ({ navigation, game }) => async dispatch => {
  await dispatch({
    type: SELECT_GAME,
    game,
  })
  navigation.navigate("Play Game")
}