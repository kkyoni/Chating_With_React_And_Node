import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserChatModel.css";
import Messages from "./Messages/Messages";
import MessagesText from "./MessagesText/MessagesText";
import MessagesDrawer from "./MessagesDrawer/MessagesDrawer";
import { BlockSenderMessageDisableListActionHandler } from "../../../Redux/Actions/common/BlockSenderMessageDisableList";

function UserChatModel({
  storiesFlag,
  receiverData,
  chatListData,
  userId,
  messages,
  setMessage,
  handleSendMessage,
  fileList,
  handleChange,
  handleRemove,
  receiverId,
}) {
  const dispatch = useDispatch();
  const userListImage = "images/avatar/";
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [blockSender, setBlockSender] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(0);

  const blocksendermessagedisabledata = useSelector(
    (state) =>
      state?.BlockSenderMessageDisableListData
        ?.block_sender_message_disable_data
  );

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showSearch = (value) => {
    if (value === true) {
      setOpenSearch(value);
    } else {
      setOpenSearch(value);
      setSearchTerm("");
      setFilteredMessages(0);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredMessages = chatListData.filter((chat) =>
        chat.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filteredMessages.length);
    } else {
      setFilteredMessages(0);
    }
  }, [searchTerm, chatListData]);

  useEffect(() => {
    dispatch(BlockSenderMessageDisableListActionHandler(receiverId));
  }, [receiverId, dispatch]);

  useEffect(() => {
    setBlockSender(blocksendermessagedisabledata.data);
  }, [blocksendermessagedisabledata]);

  return (
    <div className="tyn-main tyn-chat-content" id="tynMain">
      <div className="tyn-chat-head">
        <div className="tyn-media-group">
          <div
            className="tyn-media tyn-size-lg d-none d-sm-inline-flex"
            style={
              storiesFlag
                ? {
                    borderRadius: "var(--tyn-shape)",
                    border: "3px solid green",
                  }
                : null
            }
          >
            <img
              src={`${userListImage}${receiverData?.avatar}`}
              alt={receiverData?.username}
            />
          </div>
          <div className="tyn-media-col">
            <div className="tyn-media-row">
              <h6 className="name">{receiverData?.username}</h6>
            </div>
            <div className="tyn-media-row has-dot-sap">
              <span className="meta">Active</span>
            </div>
          </div>
        </div>

        <ul className="tyn-list-inline gap gap-3 ms-auto">
          <li>
            <button
              className="btn btn-icon btn-light js-toggle-chat-search"
              onClick={(e) => showSearch(true)}
            >
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
            </button>
          </li>
          <li>
            <button
              className="btn btn-icon btn-light js-toggle-chat-options"
              onClick={showDrawer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-layout-sidebar-inset-reverse"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"></path>
                <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"></path>
              </svg>
            </button>
          </li>
        </ul>
        {openSearch ? (
          <div className="tyn-chat-search active" id="tynChatSearch">
            <div className="flex-grow-1">
              <div className="form-group">
                <div className="form-control-wrap form-control-plaintext-wrap">
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
                    className="form-control form-control-plaintext"
                    id="searchInThisChat"
                    placeholder="Search in this chat"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap gap-3">
              <ul className="tyn-list-inline " style={{ marginBottom: "0px" }}>
                <li style={{ marginRight: "5px" }}>
                  <button className="btn btn-icon btn-md btn-light js-toggle-chat-search">
                    {filteredMessages}
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-icon btn-md btn-light js-toggle-chat-search"
                    onClick={(e) => showSearch(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
      <Messages
        chatListData={chatListData}
        userId={userId}
        receiverId={receiverId}
        searchTerm={searchTerm}
      />
      {blockSender ? (
        <div className="tyn-chat-form">
          <div
            className="tyn-chat-form-enter"
            style={{ textAlign: "center", display: "block", color: "red" }}
          >
            Block User
          </div>
        </div>
      ) : (
        <MessagesText
          messages={messages}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          fileList={fileList}
          handleChange={handleChange}
          handleRemove={handleRemove}
        />
      )}
      {open ? (
        <MessagesDrawer
          chatListData={chatListData}
          onClose={onClose}
          open={open}
          receiverId={receiverId}
        />
      ) : null}
    </div>
  );
}

export default UserChatModel;
