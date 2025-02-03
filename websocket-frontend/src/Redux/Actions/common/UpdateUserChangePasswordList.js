import Swal from "sweetalert2";
import {
  UPDATE_USER_CHANGE_PASSWORD_LIST_ERROR,
  UPDATE_USER_CHANGE_PASSWORD_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UpdateUserChangePasswordListApi } from "../../Apis/common/ApiConfig";
import { toast } from "react-toastify";

export const UpdateUserChangePasswordListSuccess = (res) => {
  return {
    type: UPDATE_USER_CHANGE_PASSWORD_LIST_SUCCESS,
    payload: res,
  };
};

export const UpdateUserChangePasswordListError = (error) => {
  return {
    type: UPDATE_USER_CHANGE_PASSWORD_LIST_ERROR,
    error: error,
  };
};

export const UpdateUserChangePasswordActionHandler = (values) => {
  return (dispatch) => {
    try {
      UpdateUserChangePasswordListApi(values)
        .then((res) => {
          const errorMessage = res?.message || "Something went wrong!";
          if (res.status === "success") {
            toast.success("Profile Update Succesfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(UpdateUserChangePasswordListSuccess(res.data));
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: errorMessage,
              showConfirmButton: false,
              text: "Failed to update profile",
              timer: 1500,
            });
            dispatch(UpdateUserChangePasswordListError(errorMessage));
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Profile update failed",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(UpdateUserChangePasswordListError("Something went wrong!!!"));
        });
    } catch (err) {
      dispatch(UpdateUserChangePasswordListError(err));
    }
  };
};
