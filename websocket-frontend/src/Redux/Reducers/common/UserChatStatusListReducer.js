import {
  USER_CHAT_STATUS_LIST_ERROR,
  USER_CHAT_STATUS_LIST_REQUEST,
  USER_CHAT_STATUS_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_chat_status_list_data: "",
  loader: false,
};
const UserChatStatusListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CHAT_STATUS_LIST_SUCCESS:
      return {
        ...initialState.user_chat_status_list_data,
        error: "",
        user_chat_status_list_data: action.payload,
        loader: false,
      };
    case USER_CHAT_STATUS_LIST_ERROR:
      return {
        ...initialState.user_chat_status_list_data,
        error: action.error,
        user_chat_status_list_data: "",
        loader: false,
      };
    case USER_CHAT_STATUS_LIST_REQUEST:
      return {
        ...initialState.user_chat_status_list_data,
        error: null,
        user_chat_status_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserChatStatusListReducer;
