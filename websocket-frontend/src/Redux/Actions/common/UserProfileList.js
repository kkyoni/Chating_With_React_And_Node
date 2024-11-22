import Swal from 'sweetalert2';
import { USER_PROFILE_LIST_ERROR, USER_PROFILE_LIST_SUCCESS } from '../../Types/common/Types';
import { UserProfileListApi } from "../../Apis/common/ApiConfig";

export const UserProfileListSuccess = (res) => {
    return {
        type: USER_PROFILE_LIST_SUCCESS,
        payload: res,
    };
};
export const UserProfileListError = (error) => {
    return {
        type: USER_PROFILE_LIST_ERROR,
        error: error,
    };
};

export const UserProfileListActionHandler = () => {
  return (dispatch) => {
    try {
      UserProfileListApi()
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(UserProfileListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserProfileListError(errorMessage));
            }
          } else {
            dispatch(UserProfileListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserProfileListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserProfileListError(err));
    }
  };
};