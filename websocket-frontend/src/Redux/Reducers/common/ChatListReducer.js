import {
  CHATLIST_ERROR,
  CHATLIST_REQUEST,
  CHATLIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  chat_list_data: "",
  loader: false,
};
const ChatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATLIST_SUCCESS:
      return {
        ...initialState.chat_list_data,
        error: "",
        chat_list_data: action.payload,
        loader: false,
      };
    case CHATLIST_ERROR:
      return {
        ...initialState.chat_list_data,
        error: action.error,
        chat_list_data: "",
        loader: false,
      };
    case CHATLIST_REQUEST:
      return {
        ...initialState.chat_list_data,
        error: null,
        chat_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default ChatListReducer;
