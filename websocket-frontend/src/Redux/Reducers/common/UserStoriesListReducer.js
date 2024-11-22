import {
  USER_STORIES_LIST_ERROR,
  USER_STORIES_LIST_REQUEST,
  USER_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_stories_list_data: "",
  loader: false,
};
const UserStoriesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STORIES_LIST_SUCCESS:
      return {
        ...initialState.user_stories_list_data,
        error: "",
        user_stories_list_data: action.payload,
        loader: false,
      };
    case USER_STORIES_LIST_ERROR:
      return {
        ...initialState.user_stories_list_data,
        error: action.error,
        user_stories_list_data: "",
        loader: false,
      };
    case USER_STORIES_LIST_REQUEST:
      return {
        ...initialState.user_stories_list_data,
        error: null,
        user_stories_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserStoriesListReducer;
