import Swal from 'sweetalert2';
import { USERLIST_ERROR, USERLIST_SUCCESS } from '../../Types/common/Types';
import { UserListApi } from "../../Apis/common/ApiConfig";

export const UserListSuccess = (res) => {
    return {
        type: USERLIST_SUCCESS,
        payload: res,
    };
};
export const UserListError = (error) => {
    return {
        type: USERLIST_ERROR,
        error: error,
    };
};

export const UserListActionHandler = () => {
  return (dispatch) => {
    try {
      UserListApi()
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(UserListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserListError(errorMessage));
            }
          } else {
            dispatch(UserListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserListError(err));
    }
  };
};