import Swal from 'sweetalert2';
import { USER_CHAT_STATUS_LIST_ERROR, USER_CHAT_STATUS_LIST_SUCCESS } from '../../Types/common/Types';
import { UserChatStatusListApi } from "../../Apis/common/ApiConfig";

export const UserChatStatusListSuccess = (res) => {
    return {
        type: USER_CHAT_STATUS_LIST_SUCCESS,
        payload: res,
    };
};
export const UserChatStatusListError = (error) => {
    return {
        type: USER_CHAT_STATUS_LIST_ERROR,
        error: error,
    };
};

export const UserChatStatusActionHandler = (receiverId) => {
  return (dispatch) => {
    try {
        UserChatStatusListApi(receiverId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(UserChatStatusListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserChatStatusListError(errorMessage));
            }
          } else {
            dispatch(UserChatStatusListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserChatStatusListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserChatStatusListError(err));
    }
  };
};