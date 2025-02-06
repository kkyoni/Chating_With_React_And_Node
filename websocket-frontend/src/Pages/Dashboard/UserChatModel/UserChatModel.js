import React, { useState } from "react";
import "./UserChatModel.css";
import Messages from "./Messages/Messages";
import MessagesText from "./MessagesText/MessagesText";
import MessagesDrawer from "./MessagesDrawer/MessagesDrawer";

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
  const userListImage = "images/avatar/";
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
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
      </div>
      <Messages
        chatListData={chatListData}
        userId={userId}
        receiverId={receiverId}
      />
      <MessagesText
        messages={messages}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        fileList={fileList}
        handleChange={handleChange}
        handleRemove={handleRemove}
      />
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
