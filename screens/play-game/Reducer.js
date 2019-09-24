import {
  SELECT_GAME,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_FAILURE,
  FETCH_SCORES_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingPosts: false,
  fetchingPostsSuccess: false,
  fetchingPostsError: null,

  isCreatingPost: false,
  postCreationError: null,
  postCreationSuccess: null,

  isFetchingScores: false,
  fetchingScoresError: null,
  fetchingScoresSuccess: null,

  game: null,
  posts: [],
  scores: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SELECT_GAME:
      return {
        ...state,
        game: action.game,
      }
    
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetchingPosts: true,
        fetchingPostsError: null,
      }
    
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetchingPosts: false,
        fetchingPostsSuccess: false,
        fetchingPostsError: action.message,
      }

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        fetchingPostsSuccess: true,
        posts: action.posts,
      }

    case CREATE_POST_REQUEST:
      return {
        ...state,
        isCreatingPost: true,
      }

    case CREATE_POST_FAILURE:
      return {
        ...state,
        postCreationError: action.data,
        isCreatingPost: false,
      }

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        postCreationSuccess: true,
        isCreatingPost: false,
        posts: [
          ...state.posts,
          action.post,
        ]
      }

    case FETCH_SCORES_REQUEST:
      return {
        ...state,
        isFetchingScores: true,
        fetchingPostsError: null,
      }

    case FETCH_SCORES_FAILURE:
      return {
        ...state,
        isFetchingScores: false,
        fetchingScoresError: action.message,
        fetchingScoresSuccess: false,
      }

    case FETCH_SCORES_SUCCESS:
      return {
        ...state,
        isFetchingScores: false,
        fetchingScoresSuccess: true,
        scores: action.scores,
      }
    
    default:
      return state;
  }
}

export default reducer;