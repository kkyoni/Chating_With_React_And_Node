import {
  USER_SELF_STORIES_LIST_ERROR,
  USER_SELF_STORIES_LIST_REQUEST,
  USER_SELF_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_self_stories_list_data: "",
  loader: false,
};
const UserSelfStoriesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SELF_STORIES_LIST_SUCCESS:
      return {
        ...initialState.user_self_stories_list_data,
        error: "",
        user_self_stories_list_data: action.payload,
        loader: false,
      };
    case USER_SELF_STORIES_LIST_ERROR:
      return {
        ...initialState.user_self_stories_list_data,
        error: action.error,
        user_self_stories_list_data: "",
        loader: false,
      };
    case USER_SELF_STORIES_LIST_REQUEST:
      return {
        ...initialState.user_self_stories_list_data,
        error: null,
        user_self_stories_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserSelfStoriesListReducer;
