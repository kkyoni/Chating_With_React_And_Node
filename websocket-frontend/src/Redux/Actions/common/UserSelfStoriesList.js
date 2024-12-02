import Swal from "sweetalert2";
import {
  USER_SELF_STORIES_LIST_ERROR,
  USER_SELF_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";
import { UserSelfStoriesListApi } from "../../Apis/common/ApiConfig";

export const UserSelfStoriesListSuccess = (res) => {
  return {
    type: USER_SELF_STORIES_LIST_SUCCESS,
    payload: res,
  };
};
export const UserSelfStoriesListError = (error) => {
  return {
    type: USER_SELF_STORIES_LIST_ERROR,
    error: error,
  };
};

export const UserSelfStoriesListActionHandler = () => {
  return (dispatch) => {
    try {
      UserSelfStoriesListApi()
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === "success") {
              dispatch(UserSelfStoriesListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(UserSelfStoriesListError(errorMessage));
            }
          } else {
            dispatch(UserSelfStoriesListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(UserSelfStoriesListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(UserSelfStoriesListError(err));
    }
  };
};
