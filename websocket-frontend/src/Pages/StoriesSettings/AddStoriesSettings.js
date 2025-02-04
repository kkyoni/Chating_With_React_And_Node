import React, { useEffect, useState } from "react";
import { Upload, message, Button, Input, Carousel, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AddStoriesListActionHandler } from "../../Redux/Actions/common/AddStoriesList";
import { useDispatch, useSelector } from "react-redux";
import { UserSelfStoriesListActionHandler } from "../../Redux/Actions/common/UserSelfStoriesList";

function AddStoriesSettings() {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [userStoriesData, setUserStoriesData] = useState([]);
  const [textValues, setTextValues] = useState({});
  const [storiesCountData, setStoriesCountData] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Initialize text fields for new files (if not already set)
    const updatedTextValues = { ...textValues };
    newFileList.forEach((file) => {
      if (!updatedTextValues[file.uid]) {
        updatedTextValues[file.uid] = "";
      }
    });

    // Remove captions for removed files
    Object.keys(updatedTextValues).forEach((uid) => {
      if (!newFileList.some((file) => file.uid === uid)) {
        delete updatedTextValues[uid];
      }
    });

    setTextValues(updatedTextValues);
  };

  const handleTextChange = (uid, value) => {
    setTextValues((prev) => ({
      ...prev,
      [uid]: value,
    }));
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images[]", file.originFileObj);
      formData.append(
        "captions[]",
        textValues[file.uid]?.trim() || "Default Caption"
      );
    });

    try {
      dispatch(AddStoriesListActionHandler(formData));
      message.success("Uploaded successfully!");
      setFileList([]);
      setTextValues({});
    } catch (error) {
      message.error("Failed to upload files.");
    }
  };
  const userselfstorieslistdata = useSelector(
    (state) => state?.UserSelfStoriesListData?.user_self_stories_list_data
  );
  const addstorieslistdata = useSelector(
    (state) => state?.AddStoriesListData?.add_stories_list_data
  );

  useEffect(() => {
    dispatch(UserSelfStoriesListActionHandler());
  }, [dispatch]);

  useEffect(() => {
    if (userselfstorieslistdata) {
      setUserStoriesData(userselfstorieslistdata.stories);
      setStoriesCountData(userselfstorieslistdata.totalCount);
    }
  }, [userselfstorieslistdata]);

  useEffect(() => {
    if (addstorieslistdata) {
      setUserStoriesData(addstorieslistdata.stories);
      setStoriesCountData(addstorieslistdata.total_count);
    }
  }, [addstorieslistdata]);

  return (
    <div className="tyn-content tyn-stories tyn-stories-page has-aside-sticky">
      <div className="tyn-aside tyn-aside-sticky">
        <div className="tyn-aside-head">
          <div className="tyn-aside-head-text">
            <h3 className="tyn-aside-title tyn-title">Stories</h3>
            <span className="tyn-subtext">{storiesCountData} stories</span>
          </div>
          <Button type="primary" onClick={showModal}>
            View Stories
          </Button>
        </div>
        <div className="tyn-aside-body" data-simplebar="init">
          <div className="simplebar-wrapper" style={{ margin: "0px" }}>
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer"></div>
            </div>
            <div className="simplebar-mask">
              <div
                className="simplebar-offset"
                style={{ right: "0px", bottom: "0px" }}
              >
                <div
                  className="simplebar-content-wrapper "
                  tabindex="0"
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "100%", overflow: "hidden" }}
                >
                  <div className="simplebar-content" style={{ padding: "0px" }}>
                    <div className="tyn-aside-row pt-0">
                      <div className="tyn-stories-thumb swiper swiper-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode swiper-grid swiper-grid-column swiper-css-mode swiper-thumbs">
                        <div
                          className="swiper-wrapper"
                          id="swiper-wrapper-d5737ae189ac2aa4"
                          aria-live="polite"
                          style={{ width: "331px" }}
                        >
                          {userStoriesData.length > 0 ? (
                            userStoriesData.map((img) => (
                              <div
                                className="swiper-slide swiper-slide-visible swiper-slide-active"
                                role="group"
                                aria-label="1 / 6"
                                style={{ width: "165.5px" }}
                                key={img.id}
                              >
                                <img
                                  src={img.images_stories}
                                  alt={img.name || "Story"}
                                  className="tyn-image"
                                />
                              </div>
                            ))
                          ) : (
                            <div
                              className="swiper-slide swiper-slide-visible swiper-slide-active"
                              role="group"
                              aria-label="1 / 6"
                              style={{ width: "165.5px" }}
                            >
                              No stories available.
                            </div>
                          )}
                        </div>

                        <span
                          className="swiper-notification"
                          aria-live="assertive"
                          aria-atomic="true"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tyn-content tyn-content-page">
        <div className="tyn-main tyn-content-inner" id="tynMain">
          <div className="container">
            <div className="tyn-profile">
              <div className="tyn-profile-details">
                <div className="tab-content">
                  <div
                    className="tab-pane show active"
                    id="profile-edit"
                    tabIndex="0"
                    role="tabpanel"
                  >
                    <div className="row gy-5">
                      <div className="col-12">
                        <div className="row gy-4">
                          <div className="col-lg-9">
                            <div className="row g-gs">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    multiple
                                    beforeUpload={() => false}
                                  >
                                    {fileList.length >= 8 ? null : (
                                      <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                          Upload
                                        </div>
                                      </div>
                                    )}
                                  </Upload>
                                </div>
                                {fileList.map((file) => (
                                  <Input
                                    key={file.uid}
                                    placeholder="Enter caption"
                                    value={textValues[file.uid] || ""}
                                    onChange={(e) =>
                                      handleTextChange(file.uid, e.target.value)
                                    }
                                    style={{ marginTop: 10 }}
                                  />
                                ))}
                                <Button
                                  type="primary"
                                  onClick={handleUpload}
                                  disabled={fileList.length === 0}
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="View Stories"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="tyn-content-inner d-flex align-items-center">
          <div className="tyn-stories-wrap">
            <div className="tyn-stories-slider swiper swiper-slider swiper-fade swiper-initialized swiper-horizontal swiper-pointer-events swiper-watch-progress swiper-backface-hidden">
              <Carousel arrows infinite={false}>
                {userStoriesData && userStoriesData.length > 0 ? (
                  userStoriesData.map((user, index) => (
                    <div
                      key={index}
                      className="swiper-slide"
                      role="group"
                      aria-label={`${index + 1} / ${userStoriesData.length}`}
                      style={{
                        width: "540px",
                        opacity: "1",
                        transform: "translate3d(0px, 0px, 0px)",
                        transitionDuration: "400ms",
                      }}
                    >
                      <div className="tyn-stories-item">
                        <img
                          src={user.images_stories}
                          className="tyn-image"
                          alt={user.title || "Story image"}
                        />
                        <div className="tyn-stories-content">
                          <h5 className="tyn-stories-title text-white">
                            {user.title || "Untitled Story"}
                          </h5>
                          <p className="text-white">
                            viewers: {user.viewers || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      display: "block",
                      flex: "auto",
                    }}
                  >
                    <div
                      className="tyn-appbar-logo"
                      style={{
                        top: "40%",
                        position: "relative",
                        border: "none",
                      }}
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
              </Carousel>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddStoriesSettings;
