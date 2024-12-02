import {
  ADD_STORIES_LIST_ERROR,
  ADD_STORIES_LIST_REQUEST,
  ADD_STORIES_LIST_SUCCESS,
} from "../../Types/common/Types";

const initialState = {
  error: "",
  add_stories_list_data: "",
  loader: false,
};
const AddStoriesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STORIES_LIST_SUCCESS:
      return {
        ...initialState.add_stories_list_data,
        error: "",
        add_stories_list_data: action.payload,
        loader: false,
      };
    case ADD_STORIES_LIST_ERROR:
      return {
        ...initialState.add_stories_list_data,
        error: action.error,
        add_stories_list_data: "",
        loader: false,
      };
    case ADD_STORIES_LIST_REQUEST:
      return {
        ...initialState.add_stories_list_data,
        error: null,
        add_stories_list_data: "",
        loader: true,
      };
    default:
      return state;
  }
};
export default AddStoriesListReducer;
