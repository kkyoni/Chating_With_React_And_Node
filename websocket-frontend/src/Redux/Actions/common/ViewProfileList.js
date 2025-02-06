import Swal from 'sweetalert2';
import { VIEW_PROFILE_LIST_ERROR, VIEW_PROFILE_LIST_SUCCESS } from '../../Types/common/Types';
import { ViewProfileListApi } from "../../Apis/common/ApiConfig";

export const ViewProfileListSuccess = (res) => {
    return {
        type: VIEW_PROFILE_LIST_SUCCESS,
        payload: res,
    };
};
export const ViewProfileListError = (error) => {
    return {
        type: VIEW_PROFILE_LIST_ERROR,
        error: error,
    };
};

export const ViewProfileListActionHandler = (viewId) => {
  return (dispatch) => {
    try {
      ViewProfileListApi(viewId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(ViewProfileListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(ViewProfileListError(errorMessage));
            }
          } else {
            dispatch(ViewProfileListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(ViewProfileListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(ViewProfileListError(err));
    }
  };
};