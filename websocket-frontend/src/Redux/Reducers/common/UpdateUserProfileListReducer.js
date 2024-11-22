import {
  UPDATE_USER_PROFILE_LIST_ERROR,
  UPDATE_USER_PROFILE_LIST_REQUEST,
  UPDATE_USER_PROFILE_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  update_user_profile_list_data: "",
  loader: false,
};
const UpdateUserProfileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_LIST_SUCCESS:
      return {
        ...initialState.update_user_profile_list_data,
        error: "",
        update_user_profile_list_data: action.payload,
        loader: false,
      };
    case UPDATE_USER_PROFILE_LIST_ERROR:
      return {
        ...initialState.update_user_profile_list_data,
        error: action.error,
        update_user_profile_list_data: "",
        loader: false,
      };
    case UPDATE_USER_PROFILE_LIST_REQUEST:
      return {
        ...initialState.update_user_profile_list_data,
        error: null,
        update_user_profile_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UpdateUserProfileListReducer;
