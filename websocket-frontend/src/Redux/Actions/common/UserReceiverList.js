import Swal from 'sweetalert2';
import { USERRECEIVERLIST_ERROR, USERRECEIVERLIST_SUCCESS } from '../../Types/common/Types';
import { UserReceiverListApi } from "../../Apis/common/ApiConfig";

export const UserReceiverListSuccess = (res) => {
    return {
        type: USERRECEIVERLIST_SUCCESS,
        payload: res,
    };
};
export const UserReceiverListError = (error) => {
    return {
        type: USERRECEIVERLIST_ERROR,
        error: error,
    };
};

export const UserReceiverListActionHandler = (receiverID) => {
  return (dispatch) => {
    try {
      UserReceiverListApi(receiverID)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(UserReceiverListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserReceiverListError(errorMessage));
            }
          } else {
            dispatch(UserReceiverListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserReceiverListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserReceiverListError(err));
    }
  };
};