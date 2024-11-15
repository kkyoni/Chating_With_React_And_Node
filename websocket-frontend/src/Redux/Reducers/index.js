import { combineReducers } from "redux";
import LoginReducer from "./common/LoginReducer.js";
import UserListReducer from "./common/UserListReducer.js";
import ChatListReducer from "./common/ChatListReducer.js";
import UserReceiverReducer from "./common/UserReceiverReducer.js";
import UserSearchListReducer from "./common/UserSearchListReducer.js";

const rootReducer = combineReducers({
    LoginData: LoginReducer,
    UserListData: UserListReducer,
    ChatListData: ChatListReducer,
    UserReceiverListData: UserReceiverReducer,
    UserSearchListData: UserSearchListReducer,
});
export default rootReducer;