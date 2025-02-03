import { combineReducers } from "redux";
import LoginReducer from "./common/LoginReducer.js";
import UserListReducer from "./common/UserListReducer.js";
import ChatListReducer from "./common/ChatListReducer.js";
import UserReceiverReducer from "./common/UserReceiverReducer.js";
import UserProfileListReducer from "./common/UserProfileListReducer.js";
import UpdateUserProfileListReducer from "./common/UserProfileListReducer.js";
import UserStoriesListReducer from "./common/UserStoriesListReducer.js";
import UserSelfStoriesListReducer from "./common/UserSelfStoriesListReducer.js";
import AddStoriesListReducer from "./common/AddStoriesListReducer.js";
import UserViewStoriesListReducer from "./common/UserViewStoriesListReducer.js";
import UserGetStoriesListReducer from "./common/UserGetStoriesListReducer.js";
import UserChangePasswordListReducer from "./common/UserChangePasswordListReducer.js";
import UserChatStatusListReducer from "./common/UserChatStatusListReducer.js";
import UserChatDeleteListReducer from "./common/UserChatDeleteListReducer.js";
import DeleteUserChatListReducer from "./common/DeleteUserChatListReducer.js";

const rootReducer = combineReducers({
  LoginData: LoginReducer,
  UserListData: UserListReducer,
  ChatListData: ChatListReducer,
  UserReceiverListData: UserReceiverReducer,
  UserProfileListData: UserProfileListReducer,
  UpdateUserProfileListData: UpdateUserProfileListReducer,
  UserStoriesListData: UserStoriesListReducer,
  AddStoriesListData: AddStoriesListReducer,
  UserViewStoriesListData: UserViewStoriesListReducer,
  UserSelfStoriesListData: UserSelfStoriesListReducer,
  UserGetStoriesListData: UserGetStoriesListReducer,
  UserChangePasswordListData: UserChangePasswordListReducer,
  UserChatStatusListData: UserChatStatusListReducer,
  UserChatDeleteListData: UserChatDeleteListReducer,
  DeleteUserChatListData: DeleteUserChatListReducer,
});
export default rootReducer;
