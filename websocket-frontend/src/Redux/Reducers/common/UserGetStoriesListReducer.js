import {
  USER_GET_STORIES_LIST_ERROR,
  USER_GET_STORIES_LIST_REQUEST,
  USER_GET_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_get_stories_list_data: "",
  loader: false,
};
const UserGetStoriesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_STORIES_LIST_SUCCESS:
      return {
        ...initialState.user_get_stories_list_data,
        error: "",
        user_get_stories_list_data: action.payload,
        loader: false,
      };
    case USER_GET_STORIES_LIST_ERROR:
      return {
        ...initialState.user_get_stories_list_data,
        error: action.error,
        user_get_stories_list_data: "",
        loader: false,
      };
    case USER_GET_STORIES_LIST_REQUEST:
      return {
        ...initialState.user_get_stories_list_data,
        error: null,
        user_get_stories_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserGetStoriesListReducer;
