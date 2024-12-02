import React from "react";
import { Button, Upload } from "antd";

function MessagesText({
  message,
  setMessage,
  handleSendMessage,
  fileList,
  handleChange,
  handleRemove,
}) {
  return (
    <>
      <div style={{ width: "100%", background: "#FFF" }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onRemove={handleRemove}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
        ></Upload>
      </div>

      <div className="tyn-chat-form">
        <div className="tyn-chat-form-insert">
          <ul className="tyn-list-inline gap gap-3">
            <li className="d-none d-sm-block">
              <Upload multiple onChange={handleChange} onRemove={handleRemove}>
                <Button className="btn btn-icon btn-light btn-md btn-pill">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-card-image"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"></path>
                  </svg>
                </Button>
              </Upload>
            </li>
          </ul>
        </div>

        <div className="tyn-chat-form-enter">
          <input
            className="tyn-chat-form-input"
            id="tynChatInput"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-icon btn-white btn-md btn-pill"
            id="tynChatSend"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default MessagesText;
