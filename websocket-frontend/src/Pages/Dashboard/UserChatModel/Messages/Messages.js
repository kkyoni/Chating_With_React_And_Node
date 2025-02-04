import React, { useState, useEffect, useCallback } from "react";
import CarouselModel from "./CarouselModel/CarouselModel";
import { UserChatStatusActionHandler } from "../../../../Redux/Actions/common/UserChatStatusList";
import { useDispatch, useSelector } from "react-redux";
import { UserListActionHandler } from "../../../../Redux/Actions/common/UserList";
// import { UserChatDeleteListActionHandler } from "../../../../Redux/Actions/common/UserChatDeleteList";
// import Swal from "sweetalert2";
import { ChatListActionHandler } from "../../../../Redux/Actions/common/ChatList";

function Messages({ chatListData, userId, receiverId }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselData, setCarousel] = useState([]);

  const userchatstatuslistdata = useSelector(
    (state) => state?.UserChatStatusListData?.user_chat_status_list_data
  );

  const userchatdeletelistdata = useSelector(
    (state) => state?.UserChatDeleteListData?.user_chat_delete_list_data
  );

  let lastDate = null;

  const getDateLabel = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  const showModal = (chatId) => {
    const imagesRecord = chatListData.find((chat) => chat.id === chatId);
    if (imagesRecord) {
      const images = JSON.parse(imagesRecord.images);
      setCarousel(images);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const scrollToLastMessage = useCallback(() => {
    dispatch(UserChatStatusActionHandler(receiverId));
  }, [dispatch, receiverId]);

  useEffect(() => {
    if (userchatstatuslistdata) {
      dispatch(UserListActionHandler());
    }
  }, [userchatstatuslistdata, dispatch]);

  useEffect(() => {
    if (userchatdeletelistdata) {
      dispatch(UserListActionHandler());
      dispatch(ChatListActionHandler(receiverId));
    }
  }, [userchatdeletelistdata, dispatch]);

  useEffect(() => {
    scrollToLastMessage();
  }, [receiverId, scrollToLastMessage]);

  // const handleEdit = (editId) => {
  //   console.log("Edit clicked", editId);
  // };

  // const handleDelete = (deleteId) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         dispatch(UserChatDeleteListActionHandler(deleteId));
  //       } catch (error) {
  //         Swal.fire("Error!", "Failed to delete. Please try again.", "error");
  //       }
  //     }
  //   });
  // };

  return (
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
                chatListData.map((chatlist) => {
                  const currentDate = getDateLabel(chatlist.timestamp);
                  const showDateSeparator = currentDate !== lastDate;
                  if (showDateSeparator) lastDate = currentDate;

                  return (
                    <div key={chatlist.id}>
                      {showDateSeparator && (
                        <div className="tyn-reply-separator">{currentDate}</div>
                      )}
                      <div
                        className={`tyn-reply-item ${
                          userId === chatlist.sender_id
                            ? "outgoing"
                            : "incoming"
                        }`}
                      >
                        <div className="tyn-reply-group">
                          {chatlist.images &&
                            JSON.parse(chatlist.images).length > 0 && (
                              <div
                                className="tyn-reply-bubble"
                                onClick={() => showModal(chatlist.id)}
                              >
                                <div className="tyn-reply-media">
                                  {JSON.parse(chatlist.images).map(
                                    (media, index) => {
                                      const fileExtension = media.url
                                        .split(".")
                                        .pop()
                                        .toLowerCase();
                                      const isImage = [
                                        "png",
                                        "jpg",
                                        "jpeg",
                                      ].includes(fileExtension);
                                      const isVideo = ["mp4", "webm"].includes(
                                        fileExtension
                                      );

                                      return (
                                        <div
                                          key={index}
                                          className="glightbox tyn-thumb"
                                          data-gallery="media-photo"
                                        >
                                          {isImage ? (
                                            <img
                                              src={media.url}
                                              className="tyn-image"
                                              alt={`image-${index}`}
                                            />
                                          ) : isVideo ? (
                                            <video
                                              controls
                                              className="tyn-video"
                                              style={{ width: "100%" }}
                                            >
                                              <source
                                                src={media.url}
                                                type={`video/${fileExtension}`}
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          ) : (
                                            <div className="tyn-reply-file">
                                              <a
                                                href={media.url}
                                                className="tyn-file"
                                                download
                                              >
                                                <div className="tyn-media-group">
                                                  <div className="tyn-media tyn-size-lg text-bg-light">
                                                    📄
                                                  </div>
                                                  <div className="tyn-media-col">
                                                    <h6 className="name">
                                                      {media.url
                                                        .split("/")
                                                        .pop()}
                                                    </h6>
                                                  </div>
                                                </div>
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            )}

                          {chatlist.content && (
                            <div className="tyn-reply-bubble">
                              <div className="tyn-reply-text">
                                {chatlist.content}
                              </div>
                              {/* {userId === chatlist.sender_id && (
                                <ul className="tyn-reply-tools">
                                  <li className="dropup-center">
                                    <Dropdown
                                      menu={{
                                        items: [
                                          {
                                            key: "1",
                                            label: (
                                              <span
                                                onClick={() =>
                                                  handleEdit(chatlist.id)
                                                }
                                              >
                                                Edit
                                              </span>
                                            ),
                                          },
                                          {
                                            key: "2",
                                            label: (
                                              <span
                                                onClick={() =>
                                                  handleDelete(chatlist.id)
                                                }
                                              >
                                                Delete
                                              </span>
                                            ),
                                          },
                                        ],
                                      }}
                                    >
                                      <Link onClick={(e) => e.preventDefault()}>
                                        <Space>⋮</Space>
                                      </Link>
                                    </Dropdown>
                                  </li>
                                </ul>
                              )} */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="tyn-reply-separator">
                  Start New Conversation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <CarouselModel
          carouselData={carouselData}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      ) : null}
    </div>
  );
}

export default Messages;
