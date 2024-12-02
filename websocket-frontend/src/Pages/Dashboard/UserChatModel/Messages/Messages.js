import React from "react";

function Messages({ chatListData, userId }) {
  let lastDate = null;

  // Function to format the date for Today, Yesterday, or full date
  const getDateLabel = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    // Check if the message is sent today
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    // Check if the message is sent yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    // For messages sent earlier, return the full date format
    return messageDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="tyn-chat-body js-scroll-to-end" id="tynChatBody" data-simplebar="init">
      <div className="simplebar-wrapper" style={{ margin: "0px" }}>
        <div className="simplebar-content-wrapper" style={{ height: "100%", overflow: "hidden scroll" }}>
          <div className="simplebar-content" style={{ padding: "0px" }}>
            <div className="tyn-reply" id="tynReply">
              {chatListData.length > 0 ? (
                chatListData.map((chatlist) => {
                  const currentDate = getDateLabel(chatlist.timestamp);

                  const showDateSeparator = currentDate !== lastDate;
                  if (showDateSeparator) {
                    lastDate = currentDate;
                  }

                  return (
                    <React.Fragment key={chatlist.id}>
                      {showDateSeparator && (
                        <div className="tyn-reply-separator">
                          {currentDate} {/* Show Today, Yesterday, or full date */}
                        </div>
                      )}
                      <div className={`tyn-reply-item ${userId === chatlist.sender_id ? "outgoing" : "incoming"}`}>
                        <div className="tyn-reply-group">
                          {chatlist.images && JSON.parse(chatlist.images).length > 0 ? (
                            <div className="tyn-reply-bubble">
                              <div className="tyn-reply-media">
                                {JSON.parse(chatlist.images).map((image, index) => (
                                  <a key={index} href={image.url} className="glightbox tyn-thumb" data-gallery="media-photo">
                                    <img src={image.url} className="tyn-image" alt={`image-${index}`} />
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          <div className="tyn-reply-bubble">
                            <div className="tyn-reply-text">{chatlist.content}</div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div className="tyn-reply-separator">Start New Conversation</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
