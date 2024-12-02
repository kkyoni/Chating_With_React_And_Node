import Swal from "sweetalert2";
import {
  USER_VIEW_STORIES_LIST_ERROR,
  USER_VIEW_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UserViewStoriesListApi } from "../../Apis/common/ApiConfig";

export const UserViewStoriesListSuccess = (res) => {
  return {
    type: USER_VIEW_STORIES_LIST_SUCCESS,
    payload: res,
  };
};
export const UserViewStoriesListError = (error) => {
  return {
    type: USER_VIEW_STORIES_LIST_ERROR,
    error: error,
  };
};

export const UserViewStoriesListActionHandler = (
  id,
  receiverID
) => {
  return (dispatch) => {
    try {
      UserViewStoriesListApi(id, receiverID)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              dispatch(UserViewStoriesListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserViewStoriesListError(errorMessage));
            }
          } else {
            dispatch(UserViewStoriesListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserViewStoriesListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserViewStoriesListError(err));
    }
  };
};
