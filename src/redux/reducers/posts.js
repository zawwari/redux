import * as actions from "../actions/posts";
const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }

    case actions.DELETE_POSTS: {
      return {
        ...state,
        posts: state.posts.filter((val) => val.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

export default postReducer;
