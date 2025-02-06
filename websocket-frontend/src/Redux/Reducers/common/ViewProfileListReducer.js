import {
  VIEW_PROFILE_LIST_ERROR,
  VIEW_PROFILE_LIST_REQUEST,
  VIEW_PROFILE_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  view_profile_list_data: "",
  loader: false,
};
const ViewProfileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_PROFILE_LIST_SUCCESS:
      return {
        ...initialState.view_profile_list_data,
        error: "",
        view_profile_list_data: action.payload,
        loader: false,
      };
    case VIEW_PROFILE_LIST_ERROR:
      return {
        ...initialState.view_profile_list_data,
        error: action.error,
        view_profile_list_data: "",
        loader: false,
      };
    case VIEW_PROFILE_LIST_REQUEST:
      return {
        ...initialState.view_profile_list_data,
        error: null,
        view_profile_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default ViewProfileListReducer;
