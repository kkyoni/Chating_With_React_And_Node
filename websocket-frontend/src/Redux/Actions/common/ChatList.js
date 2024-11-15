import Swal from 'sweetalert2';
import { CHATLIST_ERROR, CHATLIST_SUCCESS } from '../../Types/common/Types';
import { ChatListApi } from "../../Apis/common/ApiConfig";

export const ChatListSuccess = (res) => {
    return {
        type: CHATLIST_SUCCESS,
        payload: res,
    };
};
export const ChatListError = (error) => {
    return {
        type: CHATLIST_ERROR,
        error: error,
    };
};

export const ChatListActionHandler = (receiverID) => {
  return (dispatch) => {
    try {
      ChatListApi(receiverID)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(ChatListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(ChatListError(errorMessage));
            }
          } else {
            dispatch(ChatListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(ChatListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(ChatListError(err));
    }
  };
};