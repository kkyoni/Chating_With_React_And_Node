import {
  USERRECEIVERLIST_ERROR,
  USERRECEIVERLIST_REQUEST,
  USERRECEIVERLIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  user_receiver_list_data: "",
  loader: false,
};
const UserReceiverReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERRECEIVERLIST_SUCCESS:
      return {
        ...initialState.user_receiver_list_data,
        error: "",
        user_receiver_list_data: action.payload,
        loader: false,
      };
    case USERRECEIVERLIST_ERROR:
      return {
        ...initialState.user_receiver_list_data,
        error: action.error,
        user_receiver_list_data: "",
        loader: false,
      };
    case USERRECEIVERLIST_REQUEST:
      return {
        ...initialState.user_receiver_list_data,
        error: null,
        user_receiver_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default UserReceiverReducer;
