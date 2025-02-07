import {
  BLOCK_SENDER_MESSAGE_DISABLE_LIST_ERROR,
  BLOCK_SENDER_MESSAGE_DISABLE_LIST_REQUEST,
  BLOCK_SENDER_MESSAGE_DISABLE_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  block_sender_message_disable_data: "",
  loader: false,
};
const BlockSenderMessageDisableListReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_SENDER_MESSAGE_DISABLE_LIST_SUCCESS:
      return {
        ...initialState.block_sender_message_disable_data,
        error: "",
        block_sender_message_disable_data: action.payload,
        loader: false,
      };
    case BLOCK_SENDER_MESSAGE_DISABLE_LIST_ERROR:
      return {
        ...initialState.block_sender_message_disable_data,
        error: action.error,
        block_sender_message_disable_data: "",
        loader: false,
      };
    case BLOCK_SENDER_MESSAGE_DISABLE_LIST_REQUEST:
      return {
        ...initialState.block_sender_message_disable_data,
        error: null,
        block_sender_message_disable_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default BlockSenderMessageDisableListReducer;
