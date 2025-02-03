import Swal from "sweetalert2";
import {
  USER_CHAT_DELETE_LIST_ERROR,
  USER_CHAT_DELETE_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UserChatDeleteListApi } from "../../Apis/common/ApiConfig";
import { toast } from "react-toastify";

export const UserChatDeleteListSuccess = (res) => {
  return {
    type: USER_CHAT_DELETE_LIST_SUCCESS,
    payload: res,
  };
};

export const UserChatDeleteListError = (error) => {
  return {
    type: USER_CHAT_DELETE_LIST_ERROR,
    error: error,
  };
};

export const UserChatDeleteListActionHandler = (deleteId) => {
  return (dispatch) => {
    try {
      UserChatDeleteListApi(deleteId)
        .then((res) => {
          const errorMessage = res?.message || "Something went wrong!";
          if (res.status === "success") {
            toast.success("User Delete Chat Succesfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(UserChatDeleteListSuccess(res.data));
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: errorMessage,
              showConfirmButton: false,
              text: "Failed to User Delete Chat",
              timer: 1500,
            });
            dispatch(UserChatDeleteListError(errorMessage));
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Profile User Delete Chat",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(UserChatDeleteListError("Something went wrong!!!"));
        });
    } catch (err) {
      dispatch(UserChatDeleteListError(err));
    }
  };
};
