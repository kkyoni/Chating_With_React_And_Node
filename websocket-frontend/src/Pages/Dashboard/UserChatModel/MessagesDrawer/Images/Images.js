import React from "react";

const Images = ({ chatListData }) => {
  return (
    <div className="tyn-aside-row">
      <div className="tab-content">
        <div
          className="tab-pane show active"
          id="chat-media-images"
          tabIndex="0"
          role="tabpanel"
        >
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
                            const isImage = ["png", "jpg", "jpeg"].includes(
                              fileExtension
                            );

                            return (
                              isImage && (
                                <div key={index} className="col-4">
                                  <a
                                    href={media.url}
                                    className="glightbox tyn-thumb"
                                    data-gallery="media-photo"
                                  >
                                    <img
                                      src={media.url}
                                      className="tyn-image"
                                      alt={`image-${index}`}
                                      style={{ height: "150px" }}
                                    />
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
              <div className="tyn-reply-separator">No Images Conversation</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
