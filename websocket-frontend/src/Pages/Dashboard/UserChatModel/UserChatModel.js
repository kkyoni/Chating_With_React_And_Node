import React from "react";
import { useNavigate } from "react-router-dom";

function UserChatModel({
  storiesFlag,
  receiverData,
  chatListData,
  userId,
  message,
  setMessage,
  handleSendMessage,
}) {
  const navigate = useNavigate();
  const userListImage = "images/avatar/";

  const handleStories = (receiverData) => {
    navigate(`/stories/${receiverData.id}`);
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
            onClick={storiesFlag ? () => handleStories(receiverData) : null}
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
      </div>

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
                {chatListData.length > 0 ? (
                  chatListData
                    .sort((b, a) => a.id - b.id)
                    .map((chatlist) => (
                      <div
                        key={chatlist.id}
                        className={`tyn-reply-item ${
                          userId === chatlist.sender_id
                            ? "outgoing"
                            : "incoming"
                        }`}
                      >
                        <div className="tyn-reply-group">
                          <div className="tyn-reply-bubble">
                            <div className="tyn-reply-text">
                              {chatlist.content}
                              {chatlist.file_url && (
                                <a
                                  href={chatlist.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={chatlist.file_url}
                                    alt="attachment"
                                    style={{ maxWidth: "100px" }}
                                  />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="tyn-reply-separator">
                    Start New Conversation
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tyn-chat-form">
        <div className="tyn-chat-form-enter">
          <input
            className="tyn-chat-form-input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-icon btn-lg btn-primary"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserChatModel;
