import Swal from "sweetalert2";
import {
  USER_STORIES_LIST_ERROR,
  USER_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UserStoriesListApi } from "../../Apis/common/ApiConfig";

export const UserStoriesListSuccess = (res) => {
  return {
    type: USER_STORIES_LIST_SUCCESS,
    payload: res,
  };
};
export const UserStoriesListError = (error) => {
  return {
    type: USER_STORIES_LIST_ERROR,
    error: error,
  };
};

export const UserStoriesListActionHandler = (data) => {
  return (dispatch) => {
    try {
      UserStoriesListApi(data)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              dispatch(UserStoriesListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserStoriesListError(errorMessage));
            }
          } else {
            dispatch(UserStoriesListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserStoriesListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserStoriesListError(err));
    }
  };
};
