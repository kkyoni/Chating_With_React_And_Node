import React from "react";
// import { useNavigate } from "react-router-dom";
import "./UserChatModel.css";
import Messages from "./Messages/Messages";
import MessagesText from "./MessagesText/MessagesText";

function UserChatModel({
  storiesFlag,
  receiverData,
  chatListData,
  userId,
  message,
  setMessage,
  handleSendMessage,
  fileList,
  handleChange,
  handleRemove,
}) {
  // const navigate = useNavigate();
  const userListImage = "images/avatar/";
  // const handleStories = () => {
  //   navigate(`/stories`);
  // };
  // const handleStories = (receiverData) => {
  //   navigate(`/stories/${receiverData.id}`);
  // };

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
            // onClick={storiesFlag ? () => handleStories(receiverData) : null}
            // onClick={storiesFlag ? handleStories() : null}
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
      <Messages chatListData={chatListData} userId={userId} />
      <MessagesText
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        fileList={fileList}
        handleChange={handleChange}
        handleRemove={handleRemove}
      />
    </div>
  );
}

export default UserChatModel;
