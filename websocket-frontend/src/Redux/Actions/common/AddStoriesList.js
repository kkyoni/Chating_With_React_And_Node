import Swal from 'sweetalert2';
import { ADD_STORIES_LIST_ERROR, ADD_STORIES_LIST_SUCCESS } from '../../Types/common/Types';
import { AddStoriesListApi } from "../../Apis/common/ApiConfig";

export const AddStoriesListSuccess = (res) => {
    return {
        type: ADD_STORIES_LIST_SUCCESS,
        payload: res,
    };
};
export const AddStoriesListError = (error) => {
    return {
        type: ADD_STORIES_LIST_ERROR,
        error: error,
    };
};

export const AddStoriesListActionHandler = (formData) => {
  return (dispatch) => {
    try {
      AddStoriesListApi(formData)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(AddStoriesListSuccess(res.data));
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                text: "Something went wrong!",
                timer: 1500,
              });
              dispatch(AddStoriesListError(errorMessage));
            }
          } else {
            dispatch(AddStoriesListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(AddStoriesListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(AddStoriesListError(err));
    }
  };
};