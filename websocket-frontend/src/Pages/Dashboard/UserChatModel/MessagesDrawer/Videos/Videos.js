import React from "react";

const Videos = ({ chatListData }) => {
  return (
    <div className="row g-3">
      {chatListData.length > 0 ? (
        chatListData.map((chatlist) => {
          if (chatlist.images) {
            try {
              const imagesArray = JSON.parse(chatlist.images);
              if (imagesArray.length > 0) {
                return (
                  <>
                    {imagesArray.map((media, index) => {
                      const fileExtension = media.url
                        .split(".")
                        .pop()
                        .toLowerCase();
                      const isVideo = ["mp4", "webm"].includes(fileExtension);
                      return (
                        isVideo && (
                          <div className="col-6">
                            <video
                              controls
                              className="tyn-video"
                              style={{ width: "100%" }}
                            >
                              <source
                                src={media.url}
                                type={`video/${fileExtension}`}
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )
                      );
                    })}
                  </>
                );
              }
            } catch (error) {
              console.error("Error parsing images JSON:", error);
            }
          }
          return null;
        })
      ) : (
        <div className="tyn-reply-separator">No Videos Conversation</div>
      )}
    </div>
  );
};

export default Videos;
