import React, { useState, useEffect } from "react";
import { UserListActionHandler } from "../../../Redux/Actions/common/UserList";
import { DeleteUserChatListActionHandler } from "../../../Redux/Actions/common/DeleteUserChatList";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Badge, Dropdown } from "antd";
import {
  SyncOutlined,
  UserOutlined,
  UserDeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function UserChatList({ openChatModel, handleView, handleBlockUserChat }) {
  const dispatch = useDispatch();
  const [userListData, setUserListData] = useState([]);
  const userListImage = "images/avatar/";
  const [searchValue, setSearchValue] = useState("");
  const [refepage, setRefePage] = useState(false);
  // const [socket, setSocket] = useState(null);

  const userlistdata = useSelector(
    (state) => state?.UserListData?.user_list_data
  );

  const deleteuserchatlistdata = useSelector(
    (state) => state?.DeleteUserChatListData?.delete_user_chat_data
  );

  const blockuserchatlistdata = useSelector(
    (state) => state?.BlockUserChatListData?.block_user_chat_data
  );

  useEffect(() => {
    if (userlistdata) {
      setUserListData(userlistdata.users);
    }
  }, [userlistdata]);

  useEffect(() => {
    if (deleteuserchatlistdata) {
      dispatch(UserListActionHandler());
    }
  }, [deleteuserchatlistdata, dispatch]);

  useEffect(() => {
    if (blockuserchatlistdata) {
      console.log("blockuserchatlistdata===>",blockuserchatlistdata);
      dispatch(UserListActionHandler());
    }
  }, [blockuserchatlistdata, dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    if (value.length > 0) {
      const filteredList = userlistdata.users.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setUserListData(filteredList);
    } else {
      setUserListData(userlistdata.users);
    }
  };

  useEffect(() => {
    dispatch(UserListActionHandler());
    const newSocket = new WebSocket("ws://localhost:8080");
    // setSocket(newSocket);
    newSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData) {
        dispatch(UserListActionHandler());
      }
    };
    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  const formatTime = (time) => {
    if (!time) return "N/A";
    return moment(time).fromNow();
  };

  const handlerefepage = () => {
    setRefePage(true);
    dispatch(UserListActionHandler());
    setTimeout(() => {
      setRefePage(false);
    }, 1000);
  };

  const handleDeleteUserChat = (receiverId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the chat permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUserChatListActionHandler(receiverId));
        Swal.fire("Deleted!", "The chat has been deleted.", "success");
      }
    });
  };

  return (
    <div className="tyn-aside tyn-aside-base">
      <div className="tyn-aside-head">
        <div className="tyn-aside-head-text">
          <h3 className="tyn-aside-title">Chats</h3>
        </div>
        <div className="tyn-aside-head-tools">
          <ul className="link-group gap gx-3">
            <li className="dropdown">
              {refepage ? (
                <SyncOutlined spin />
              ) : (
                <SyncOutlined onClick={handlerefepage} />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="tyn-aside-body" data-simplebar="init">
        <div className="tyn-aside-search">
          <div className="form-group tyn-pill">
            <div className="form-control-wrap">
              <div className="form-control-icon start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
              </div>
              <input
                type="text"
                className="form-control form-control-solid"
                id="search"
                placeholder="Search contact / chat"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane show active" id="all-chats" role="tabpanel">
            <ul className="tyn-aside-list">
              {userListData.length > 0 ? (
                userListData.map((user) => (
                  <li
                    className={`tyn-aside-item js-toggle-main ${
                      user.last_status === "unread" ? "unread" : ""
                    }`}
                    key={user.user_id}
                  >
                    <div className="tyn-media-group">
                      <div className="tyn-media tyn-size-lg">
                        <Badge count={user.unread_count}>
                          <img
                            src={`${userListImage}${user.avatar}`}
                            alt={user.username}
                          />
                        </Badge>
                      </div>
                      <div className="tyn-media-col">
                        <div onClick={() => openChatModel(user.user_id)}>
                          <div className="tyn-media-row">
                            <h6 className="name">{user.username}</h6>
                          </div>
                          {user.last_message && (
                            <div className="tyn-media-row has-dot-sap">
                              <p className="content">{user.last_message}</p>
                              <span className="meta">
                                {formatTime(user.last_message_time)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="tyn-media-option tyn-aside-item-option">
                          <ul className="tyn-media-option-list">
                            <li className="dropdown">
                              <div className="btn btn-icon btn-white btn-pill dropdown-toggle">
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <span
                                            onClick={() =>
                                              handleView(user.user_id)
                                            }
                                          >
                                            View Profile
                                          </span>
                                        ),
                                        icon: <UserOutlined />,
                                      },
                                      { type: "divider" },
                                      {
                                        key: "2",
                                        label: (
                                          <span
                                            onClick={() =>
                                              openChatModel(user.user_id)
                                            }
                                          >
                                            Send Message
                                          </span>
                                        ),
                                        icon: <MessageOutlined />,
                                      },
                                      {
                                        key: "3",
                                        label: (
                                          <span
                                            onClick={() =>
                                              handleDeleteUserChat(user.user_id)
                                            }
                                          >
                                            Delete
                                          </span>
                                        ),
                                        icon: <UserDeleteOutlined />,
                                      },
                                      { type: "divider" },
                                      {
                                        key: "4",
                                        label: (
                                          <span
                                            onClick={() =>
                                              handleBlockUserChat(user.user_id)
                                            }
                                          >
                                            Block
                                          </span>
                                        ),
                                        icon: <UserDeleteOutlined />,
                                      },
                                    ],
                                  }}
                                  trigger={["click"]}
                                >
                                  <Link
                                    onClick={(e) => e.preventDefault()}
                                    className="dropdown-trigger"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-three-dots"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"></path>
                                    </svg>
                                  </Link>
                                </Dropdown>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="no-results">No results found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatList;
