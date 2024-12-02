import React, { useEffect, useState } from "react";
import { Upload, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AddStoriesListActionHandler } from "../../Redux/Actions/common/AddStoriesList";
import { useDispatch, useSelector } from "react-redux";
import { UserSelfStoriesListActionHandler } from "../../Redux/Actions/common/UserSelfStoriesList";

function AddStoriesSettings() {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [userStoriesData, setUserStoriesData] = useState([]);
  const [storiesCountData, setStoriesCountData] = useState(0);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      dispatch(AddStoriesListActionHandler(formData));
      message.success("Uploaded successfully!");
      setFileList([]);
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
    <div class="tyn-content tyn-stories tyn-stories-page has-aside-sticky">
      <div class="tyn-aside tyn-aside-sticky">
        <div class="tyn-aside-head">
          <div class="tyn-aside-head-text">
            <h3 class="tyn-aside-title tyn-title">Stories</h3>
            <span class="tyn-subtext">{storiesCountData} stories</span>
          </div>
        </div>
        <div class="tyn-aside-body" data-simplebar="init">
          <div class="simplebar-wrapper" style={{ margin: "0px" }}>
            <div class="simplebar-height-auto-observer-wrapper">
              <div class="simplebar-height-auto-observer"></div>
            </div>
            <div class="simplebar-mask">
              <div
                class="simplebar-offset"
                style={{ right: "0px", bottom: "0px" }}
              >
                <div
                  class="simplebar-content-wrapper "
                  tabindex="0"
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "100%", overflow: "hidden" }}
                >
                  <div class="simplebar-content" style={{ padding: "0px" }}>
                    <div class="tyn-aside-row pt-0">
                      <div class="tyn-stories-thumb swiper swiper-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode swiper-grid swiper-grid-column swiper-css-mode swiper-thumbs">
                        <div
                          class="swiper-wrapper"
                          id="swiper-wrapper-d5737ae189ac2aa4"
                          aria-live="polite"
                          style={{ width: "331px" }}
                        >
                          {userStoriesData.length > 0 ? (
                            userStoriesData.map((img) => (
                              <div
                                class="swiper-slide swiper-slide-visible swiper-slide-active"
                                role="group"
                                aria-label="1 / 6"
                                style={{ width: "165.5px" }}
                                key={img.id}
                              >
                                <img
                                  src={img.images_stories}
                                  alt={img.name || "Story"}
                                  class="tyn-image"
                                />
                              </div>
                            ))
                          ) : (
                            <div
                              class="swiper-slide swiper-slide-visible swiper-slide-active"
                              role="group"
                              aria-label="1 / 6"
                              style={{ width: "165.5px" }}
                            >
                              No stories available.
                            </div>
                          )}
                        </div>

                        <span
                          class="swiper-notification"
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
    </div>
  );
}

export default AddStoriesSettings;
