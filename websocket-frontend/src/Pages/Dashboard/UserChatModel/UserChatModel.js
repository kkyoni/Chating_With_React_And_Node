import React, { useState, useEffect } from "react";

function UserChatModel({
  receiverData,
  chatListData,
  userId,
  message,
  setMessage,
  handleSendMessage,
}) {
  const userListImage = "images/avatar/";

  return (
    <div className="tyn-main tyn-chat-content" id="tynMain">
      <div className="tyn-chat-head">
        <div className="tyn-media-group">
          <div className="tyn-media tyn-size-lg d-none d-sm-inline-flex">
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
      </div>

      {/* Chat body and reply area */}
      <div
        className="tyn-chat-body js-scroll-to-end"
        id="tynChatBody"
        data-simplebar="init"
      >
        <div className="simplebar-wrapper" style={{ margin: "0px" }}>
          <div
            className="simplebar-content-wrapper"
            style={{ height: "100%", overflow: "hidden scroll" }}
          >
            <div className="simplebar-content" style={{ padding: "0px" }}>
              <div className="tyn-reply" id="tynReply">
                {chatListData.map((chatlist, index) => (
                  <div
                    key={index}
                    className={`tyn-reply-item ${
                      userId === chatlist.sender_id ? "outgoing" : "incoming"
                    }`}
                  >
                    <div className="tyn-reply-group">
                      <div className="tyn-reply-bubble">
                        <div className="tyn-reply-text">{chatlist.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat form */}
      <div className="tyn-chat-form">
        <div className="tyn-chat-form-enter">
          <input
            className="tyn-chat-form-input"
            type="text"
            placeholder="Type a message..."
            id="tynChatInput"
            contentEditable={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ul className="tyn-list-inline me-n2 my-0">
            <li>
              <button
                className="btn btn-icon btn-lg btn-primary"
                id="sendBtn"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserChatModel;
