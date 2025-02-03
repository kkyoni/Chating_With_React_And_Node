import Swal from 'sweetalert2';
import { DELETE_USER_CHAT_LIST_ERROR, DELETE_USER_CHAT_LIST_SUCCESS } from '../../Types/common/Types';
import { DeleteUserChatListApi } from "../../Apis/common/ApiConfig";

export const DeleteUserChatListSuccess = (res) => {
    return {
        type: DELETE_USER_CHAT_LIST_SUCCESS,
        payload: res,
    };
};
export const DeleteUserChatListError = (error) => {
    return {
        type: DELETE_USER_CHAT_LIST_ERROR,
        error: error,
    };
};

export const DeleteUserChatListActionHandler = (receiverId) => {
  return (dispatch) => {
    try {
      DeleteUserChatListApi(receiverId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(DeleteUserChatListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(DeleteUserChatListError(errorMessage));
            }
          } else {
            dispatch(DeleteUserChatListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(DeleteUserChatListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(DeleteUserChatListError(err));
    }
  };
};