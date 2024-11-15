import {
  USERLIST_ERROR,
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_list_data: "",
  loader: false,
};
const UserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERLIST_SUCCESS:
      return {
        ...initialState.user_list_data,
        error: "",
        user_list_data: action.payload,
        loader: false,
      };
    case USERLIST_ERROR:
      return {
        ...initialState.user_list_data,
        error: action.error,
        user_list_data: "",
        loader: false,
      };
    case USERLIST_REQUEST:
      return {
        ...initialState.user_list_data,
        error: null,
        user_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserListReducer;
