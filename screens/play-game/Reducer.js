import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from './Actions';

const initialState = {
  isFetchingPosts: false,
  fetchingPostsFailure: false,
  fetchingPostsSuccess: false,
  fetchingPostsError: null,
  isCreatingPost: false,
  postCreationError: null,
  posts: [
    {
      id: '12kj3bjkh123b5',
      author: 'some guy',
      message: 'a big post that definitely doesnt fit on one line wo this is so long',
      upvotes: 0,
      downvotes: 3,
    },
    {
      id: '12kj3bjk5123b5',
      author: 'another guy',
      message: 'a small post',
      upvotes: 3,
      downvotes: 1,
    },
    {
      id: '12kj3bjk5123b5',
      author: 'other guy',
      message: 'a medium post that will probs fit',
      upvotes: 3,
      downvotes: 1,
    },
    {
      id: '12kj3bjk5153b5',
      author: 'other guy',
      message: 'a post that makes us have to scroll',
      upvotes: 3,
      downvotes: 1,
    },
    {
      id: '12kj3bjk512ab5',
      author: 'other guy',
      message: 'a post that makes us have to scroll more',
      upvotes: 3,
      downvotes: 1,
    }
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetchingPosts: true,
      }
    
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetchingPosts: false,
        fetchingPostsSuccess: false,
        fetchingPostsFailure: true,
        fetchingPostsError: action.error,
      }

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        fetchingPostsSuccess: true,
        fetchingPostsFailure: false,
        fetchingPostsError: null,
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
        postCreationError: null,
        isCreatingPost: false,
        posts: [
          ...state.posts,
          action.post,
        ]
      }
    
    default:
      return state;
  }
}

export default reducer;