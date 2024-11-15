import {
  USERSEARCHLIST_ERROR,
  USERSEARCHLIST_REQUEST,
  USERSEARCHLIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_search_list_data: "",
  loader: false,
};
const UserSearchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERSEARCHLIST_SUCCESS:
      return {
        ...initialState.user_search_list_data,
        error: "",
        user_search_list_data: action.payload,
        loader: false,
      };
    case USERSEARCHLIST_ERROR:
      return {
        ...initialState.user_search_list_data,
        error: action.error,
        user_search_list_data: "",
        loader: false,
      };
    case USERSEARCHLIST_REQUEST:
      return {
        ...initialState.user_search_list_data,
        error: null,
        user_search_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserSearchListReducer;
