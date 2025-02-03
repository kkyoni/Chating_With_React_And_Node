import {
  UPDATE_USER_CHANGE_PASSWORD_LIST_ERROR,
  UPDATE_USER_CHANGE_PASSWORD_LIST_REQUEST,
  UPDATE_USER_CHANGE_PASSWORD_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_change_password_list_data: "",
  loader: false,
};
const UserChangePasswordListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_CHANGE_PASSWORD_LIST_SUCCESS:
      return {
        ...initialState.user_change_password_list_data,
        error: "",
        user_change_password_list_data: action.payload,
        loader: false,
      };
    case UPDATE_USER_CHANGE_PASSWORD_LIST_ERROR:
      return {
        ...initialState.user_change_password_list_data,
        error: action.error,
        user_change_password_list_data: "",
        loader: false,
      };
    case UPDATE_USER_CHANGE_PASSWORD_LIST_REQUEST:
      return {
        ...initialState.user_change_password_list_data,
        error: null,
        user_change_password_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserChangePasswordListReducer;
