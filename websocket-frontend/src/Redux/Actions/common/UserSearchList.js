import Swal from 'sweetalert2';
import { USERSEARCHLIST_ERROR, USERSEARCHLIST_SUCCESS } from '../../Types/common/Types';
import { UserSearchListApi } from "../../Apis/common/ApiConfig";

export const UserSearchListSuccess = (res) => {
    return {
        type: USERSEARCHLIST_SUCCESS,
        payload: res,
    };
};
export const UserSearchListError = (error) => {
    return {
        type: USERSEARCHLIST_ERROR,
        error: error,
    };
};

export const UserSearchListActionHandler = (value) => {
  return (dispatch) => {
    try {
      UserSearchListApi(value)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(UserSearchListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserSearchListError(errorMessage));
            }
          } else {
            dispatch(UserSearchListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserSearchListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserSearchListError(err));
    }
  };
};