import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
  } from "../../Types/common/Types";
  
  const initialState = {
    error: "",
    login_data: "",
    loader: false,
  };
  const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...initialState.login_data,
          error: "",
          login_data: action.payload,
          loader: false,
        };
      case LOGIN_ERROR:
        return {
          ...initialState.login_data,
          error: action.error,
          login_data: "",
          loader: false,
        };
      case LOGIN_REQUEST:
        return {
          ...initialState.login_data,
          error: null,
          login_data: "",
          loader: true,
        };
      default:
        return state;
    }
  };
  export default LoginReducer;
  