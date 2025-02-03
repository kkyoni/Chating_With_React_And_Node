import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChatListActionHandler } from "../../Redux/Actions/common/ChatList";
import { UserReceiverListActionHandler } from "../../Redux/Actions/common/UserReceiverList";
import { getUserIdFromToken } from "../../service/Token";
import UserChatList from "./UserChatList/UserChatList";
import ViewProfile from "./UserChatList/ViewProfile/ViewProfile";
import UserChatModel from "./UserChatModel/UserChatModel";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chatListData, setChatListData] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [receiverData, setReceiverData] = useState();
  const [message, setMessage] = useState("");
  const [chatModel, setChatModel] = useState(false);
  const [ws, setWs] = useState(null);
  const [userId, setUserId] = useState(null);
  const [storiesFlag, setStoriesFlag] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [viewProfile, setViewProfile] = useState(false);

  const chatlistdata = useSelector(
    (state) => state?.ChatListData?.chat_list_data
  );
  const userreceiverlistdata = useSelector(
    (state) => state?.UserReceiverListData?.user_receiver_list_data
  );

  const openChatModel = (receiverId) => {
    setReceiverId(receiverId);
    dispatch(ChatListActionHandler(receiverId));
    dispatch(UserReceiverListActionHandler(receiverId));
    setChatModel(true);
    setMessage("");
  };

  useEffect(() => {
    if (chatlistdata) {
      setReceiverData(userreceiverlistdata?.user);
      setChatListData(chatlistdata?.messages);
      setStoriesFlag(chatlistdata.flag);
    }
  }, [chatlistdata, userreceiverlistdata]);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      navigate("/login");
    } else {
      setUserId(userId);
    }
  }, [navigate]);

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      const { token } = JSON.parse(data);
      if (token) {
        const websocket = new WebSocket("ws://localhost:8080");
        setWs(websocket);

        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.deleteMessageId) {
            // Remove the deleted message from the chat list
            setChatListData((prevChatListData) =>
              prevChatListData.filter(
                (chat) => chat.id !== data.deleteMessageId
              )
            );
          } else {
            setChatListData((prevChatListData) => [
              ...prevChatListData,
              {
                id: data.id,
                sender_id: data.senderId,
                receiver_id: data.receiverId,
                content: data.content,
                images: data.images,
                timestamp: data.timestamp,
              },
            ]);
          }
        };

        return () => websocket.close();
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (receiverId) {
      const data = localStorage.getItem("userDetails");
      if (data) {
        const { token } = JSON.parse(data);

        const formData = new FormData();
        fileList.forEach((file) =>
          formData.append("images", file.originFileObj)
        );

        try {
          const response = await fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formData,
          });

          const { urls } = await response.json();

          const messageData = {
            token,
            receiver_id: receiverId,
            content: message,
            fileList: urls.map((url) => ({
              url,
            })),
          };

          ws.send(JSON.stringify(messageData));

          setMessage("");
          setFileList([]);
        } catch (error) {
          return {
            status: "error",
            message: "Error uploading images",
            error: error,
          };
        }
      }
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  const handleView = (viewId) => {
    console.log("handleView", viewId);
    setViewProfile(true);
  };

  return (
    <div className="tyn-content tyn-content-full-height tyn-chat has-aside-base">
      <UserChatList openChatModel={openChatModel} handleView={handleView} />
      {chatModel ? (
        <UserChatModel
          storiesFlag={storiesFlag}
          receiverData={receiverData}
          chatListData={chatListData}
          userId={userId}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          fileList={fileList}
          handleChange={handleChange}
          handleRemove={handleRemove}
          receiverId={receiverId}
        />
      ) : viewProfile ? (
        <ViewProfile />
      ) : (
        <div style={{ textAlign: "center", display: "block", flex: "auto" }}>
          <div
            className="tyn-appbar-logo"
            style={{ top: "40%", position: "relative", border: "none" }}
          >
            <div className="tyn-logo size">
              <svg
                viewBox="0 0 43 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.2654 14.793C37.2654 14.793 45.0771 20.3653 41.9525 29.5311C41.9525 29.5311 41.3796 31.1976 39.0361 34.4264L42.4732 37.9677C42.4732 37.9677 43.3065 39.478 41.5879 39.9987H24.9229C24.9229 39.9987 19.611 40.155 14.8198 36.9782C14.8198 36.9782 12.1638 35.2076 9.76825 31.9787L18.6215 32.0308C18.6215 32.0308 24.298 31.9787 29.7662 28.3333C35.2344 24.6878 37.4217 18.6988 37.2654 14.793Z"
                  fill="#60A5FA"
                ></path>
                <path
                  d="M34.5053 12.814C32.2659 1.04441 19.3506 0.0549276 19.3506 0.0549276C8.31004 -0.674164 3.31055 6.09597 3.31055 6.09597C-4.24076 15.2617 3.6751 23.6983 3.6751 23.6983C3.6751 23.6983 2.99808 24.6357 0.862884 26.5105C-1.27231 28.3854 1.22743 29.3748 1.22743 29.3748H17.3404C23.4543 28.7499 25.9124 27.3959 25.9124 27.3959C36.328 22.0318 34.5053 12.814 34.5053 12.814ZM19.9963 18.7301H9.16412C8.41419 18.7301 7.81009 18.126 7.81009 17.3761C7.81009 16.6261 8.41419 16.022 9.16412 16.022H19.9963C20.7463 16.022 21.3504 16.6261 21.3504 17.3761C21.3504 18.126 20.7358 18.7301 19.9963 18.7301ZM25.3708 13.314H9.12245C8.37253 13.314 7.76843 12.7099 7.76843 11.96C7.76843 11.21 8.37253 10.6059 9.12245 10.6059H25.3708C26.1207 10.6059 26.7248 11.21 26.7248 11.96C26.7248 12.7099 26.1103 13.314 25.3708 13.314Z"
                  fill="#2563EB"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
