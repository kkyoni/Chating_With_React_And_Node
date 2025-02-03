import {
  DELETE_USER_CHAT_LIST_ERROR,
  DELETE_USER_CHAT_LIST_REQUEST,
  DELETE_USER_CHAT_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  delete_user_chat_data: "",
  loader: false,
};
const DeleteUserChatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_CHAT_LIST_SUCCESS:
      return {
        ...initialState.delete_user_chat_data,
        error: "",
        delete_user_chat_data: action.payload,
        loader: false,
      };
    case DELETE_USER_CHAT_LIST_ERROR:
      return {
        ...initialState.delete_user_chat_data,
        error: action.error,
        delete_user_chat_data: "",
        loader: false,
      };
    case DELETE_USER_CHAT_LIST_REQUEST:
      return {
        ...initialState.delete_user_chat_data,
        error: null,
        delete_user_chat_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default DeleteUserChatListReducer;
