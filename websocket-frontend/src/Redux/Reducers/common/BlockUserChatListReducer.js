import {
  BLOCK_USER_CHAT_LIST_ERROR,
  BLOCK_USER_CHAT_LIST_REQUEST,
  BLOCK_USER_CHAT_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  block_user_chat_data: "",
  loader: false,
};
const BlockUserChatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_USER_CHAT_LIST_SUCCESS:
      return {
        ...initialState.block_user_chat_data,
        error: "",
        block_user_chat_data: action.payload,
        loader: false,
      };
    case BLOCK_USER_CHAT_LIST_ERROR:
      return {
        ...initialState.block_user_chat_data,
        error: action.error,
        block_user_chat_data: "",
        loader: false,
      };
    case BLOCK_USER_CHAT_LIST_REQUEST:
      return {
        ...initialState.block_user_chat_data,
        error: null,
        block_user_chat_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default BlockUserChatListReducer;
