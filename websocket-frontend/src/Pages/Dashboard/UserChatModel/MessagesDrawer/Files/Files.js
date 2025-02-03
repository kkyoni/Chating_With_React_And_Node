import React from "react";

const Files = ({ chatListData }) => {
  return (
    <div>
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
                      const isFile = [
                        "mp4",
                        "webm",
                        "png",
                        "jpg",
                        "jpeg",
                      ].includes(fileExtension);
                      return (
                        !isFile && (
                          <div className="tyn-reply-file">
                            <a href={media.url} className="tyn-file" download>
                              <div className="tyn-media-group">
                                <div className="tyn-media tyn-size-lg text-bg-light">
                                  📄
                                </div>
                                <div className="tyn-media-col">
                                  <h6 className="name">
                                    {media.url.split("/").pop()}
                                  </h6>
                                </div>
                              </div>
                            </a>
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
        <div className="tyn-reply-separator">No File Conversation</div>
      )}
    </div>
  );
};

export default Files;
