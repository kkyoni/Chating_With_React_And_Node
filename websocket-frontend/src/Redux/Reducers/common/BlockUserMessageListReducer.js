import {
  BLOCK_USER_MESSAGE_LIST_ERROR,
  BLOCK_USER_MESSAGE_LIST_REQUEST,
  BLOCK_USER_MESSAGE_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  block_user_message_data: "",
  loader: false,
};
const BlockUserMessageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_USER_MESSAGE_LIST_SUCCESS:
      return {
        ...initialState.block_user_message_data,
        error: "",
        block_user_message_data: action.payload,
        loader: false,
      };
    case BLOCK_USER_MESSAGE_LIST_ERROR:
      return {
        ...initialState.block_user_message_data,
        error: action.error,
        block_user_message_data: "",
        loader: false,
      };
    case BLOCK_USER_MESSAGE_LIST_REQUEST:
      return {
        ...initialState.block_user_message_data,
        error: null,
        block_user_message_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default BlockUserMessageListReducer;
