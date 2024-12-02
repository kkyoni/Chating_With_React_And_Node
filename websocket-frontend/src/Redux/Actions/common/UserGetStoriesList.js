import Swal from "sweetalert2";
import {
  USER_GET_STORIES_LIST_ERROR,
  USER_GET_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UserGetStoriesListApi } from "../../Apis/common/ApiConfig";

export const UserGetStoriesListSuccess = (res) => {
  return {
    type: USER_GET_STORIES_LIST_SUCCESS,
    payload: res,
  };
};
export const UserGetStoriesListError = (error) => {
  return {
    type: USER_GET_STORIES_LIST_ERROR,
    error: error,
  };
};

export const UserGetStoriesListActionHandler = (data) => {
  return (dispatch) => {
    try {
      UserGetStoriesListApi(data)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              dispatch(UserGetStoriesListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserGetStoriesListError(errorMessage));
            }
          } else {
            dispatch(UserGetStoriesListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserGetStoriesListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserGetStoriesListError(err));
    }
  };
};
