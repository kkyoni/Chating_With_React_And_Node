import React, { useEffect, useState } from "react";
import { Drawer, Tabs } from "antd";
import Images from "./Images/Images";
import Videos from "./Videos/Videos";
import Files from "./Files/Files";
import { useDispatch, useSelector } from "react-redux";
import coverImage from "../../../../images/cover/2.jpg";
import { ViewProfileListActionHandler } from "../../../../Redux/Actions/common/ViewProfileList";

function MessagesDrawer({ onClose, open, chatListData, receiverId }) {
  const dispatch = useDispatch();
  const userListImage = "images/avatar/";
  const [userProfileData, setUserProfileData] = useState(null);

  const userprofilelistdata = useSelector(
    (state) => state?.ViewProfileListData?.view_profile_list_data
  );

  useEffect(() => {
    dispatch(ViewProfileListActionHandler(receiverId));
  }, [receiverId, dispatch]);

  useEffect(() => {
    if (userprofilelistdata) {
      setUserProfileData(userprofilelistdata.user);
    }
  }, [userprofilelistdata]);

  const items = [
    {
      key: "1",
      label: "Images",
      children: <Images chatListData={chatListData} />,
    },
    {
      key: "2",
      label: "Videos",
      children: <Videos chatListData={chatListData} />,
    },
    {
      key: "3",
      label: "Files",
      children: <Files chatListData={chatListData} />,
    },
  ];

  return (
    <Drawer onClose={onClose} open={open}>
      <div className="tyn-chat-cover">
        <img src={coverImage} alt="coverImage" />
      </div>

      <div className="tyn-media-group tyn-media-vr tyn-media-center mt-n4">
        <div className="tyn-media tyn-size-xl border border-2 border-white">
          <img
            src={`${userListImage}${userProfileData?.avatar}`}
            alt={userProfileData?.username || "Loading..."}
          />
        </div>
        <div className="tyn-media-col">
          <div className="tyn-media-row">
            <h6 className="name">
              {userProfileData?.username || "Loading..."}
            </h6>
          </div>
          <div className="tyn-media-row has-dot-sap">
            <span className="meta">{userProfileData?.email}</span>
          </div>
        </div>
      </div>

      <div className="padding_main">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Drawer>
  );
}

export default MessagesDrawer;
