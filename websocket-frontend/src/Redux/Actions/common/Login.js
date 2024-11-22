import Swal from "sweetalert2";
import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../Types/common/Types";
import { LoginApi } from "../../Apis/common/ApiConfig";
import { toast } from "react-toastify";

export const LoginSuccess = (res) => {
  return {
    type: LOGIN_SUCCESS,
    payload: res,
  };
};
export const LoginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error: error,
  };
};

export const LoginActionHandler = (data) => {
  return (dispatch) => {
    try {
      LoginApi(data)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              toast.success("Login Succesfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              dispatch(LoginSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Oops! Something went wrong.",
                timer: 1500,
              });
              dispatch(LoginError(errorMessage));
            }
          } else {
            dispatch(LoginError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(LoginError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(LoginError(err));
    }
  };
};
