import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST } from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {}, //NEED TO CHANGE BASED ON OUR API
  likes: [],
  notifications: [],
  id: -1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        id: action.payload._id,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            postId: action.payload.postId
          }
        ]
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        )
      };
    default:
      return state;
  }
}