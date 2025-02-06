import Swal from "sweetalert2";
import {
  BLOCK_USER_CHAT_LIST_ERROR,
  BLOCK_USER_CHAT_LIST_SUCCESS,
} from "../../Types/common/Types";
import { BlockUserChatListApi } from "../../Apis/common/ApiConfig";

export const BlockUserChatListSuccess = (res) => {
  return {
    type: BLOCK_USER_CHAT_LIST_SUCCESS,
    payload: res,
  };
};
export const BlockUserChatListError = (error) => {
  return {
    type: BLOCK_USER_CHAT_LIST_ERROR,
    error: error,
  };
};

export const BlockUserChatListActionHandler = (receiverId) => {
  return (dispatch) => {
    try {
      BlockUserChatListApi(receiverId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              dispatch(BlockUserChatListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(BlockUserChatListError(errorMessage));
            }
          } else {
            dispatch(BlockUserChatListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(BlockUserChatListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(BlockUserChatListError(err));
    }
  };
};
