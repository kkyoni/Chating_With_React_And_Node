import {
  USER_PROFILE_LIST_ERROR,
  USER_PROFILE_LIST_REQUEST,
  USER_PROFILE_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_profile_list_data: "",
  loader: false,
};
const UserProfileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_LIST_SUCCESS:
      return {
        ...initialState.user_profile_list_data,
        error: "",
        user_profile_list_data: action.payload,
        loader: false,
      };
    case USER_PROFILE_LIST_ERROR:
      return {
        ...initialState.user_profile_list_data,
        error: action.error,
        user_profile_list_data: "",
        loader: false,
      };
    case USER_PROFILE_LIST_REQUEST:
      return {
        ...initialState.user_profile_list_data,
        error: null,
        user_profile_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserProfileListReducer;
