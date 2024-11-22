import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { UserStoriesListActionHandler } from "../../../../Redux/Actions/common/UserStoriesList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UserStories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userStoriesListData, setUserStoriesListData] = useState([]);
  const { id } = useParams();

  const userstorieslistdata = useSelector(
    (state) => state?.UserStoriesListData?.user_stories_list_data
  );

  useEffect(() => {
    if (id) {
      dispatch(UserStoriesListActionHandler(id));
    }
  }, [id]);

  useEffect(() => {
    if (userstorieslistdata) {
      setUserStoriesListData(userstorieslistdata.stories);
    }
  }, [userstorieslistdata]);

  const handleStoriesClose = () => {
    navigate(`/`);
  };

  return (
    <div className="tyn-content tyn-stories tyn-stories-page has-aside-sticky">
      <div className="tyn-aside tyn-aside-sticky" style={{ width: "100%" }}>
        <div className="tyn-aside-head">
          <div className="tyn-aside-head-text">
            <h3 className="tyn-aside-title tyn-title">Stories</h3>
          </div>
          <div class="tyn-aside-head-tools">
            <ul class="tyn-list-inline gap gap-3">
              <li>
                <button
                  class="btn btn-icon btn-light btn-md btn-pill"
                  onClick={handleStoriesClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
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
                  className="simplebar-content-wrapper"
                  tabindex="0"
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "100%", overflow: "hidden" }}
                >
                  <div className="tyn-content-inner d-flex align-items-center">
                    <div className="tyn-stories-wrap">
                      <div className="tyn-stories-slider swiper swiper-slider swiper-fade swiper-initialized swiper-horizontal swiper-pointer-events swiper-watch-progress swiper-backface-hidden">
                        <Carousel arrows infinite={false}>
                          {userStoriesListData &&
                          userStoriesListData.length > 0 ? (
                            userStoriesListData.map((user, index) => (
                              <div
                                key={index}
                                className="swiper-slide"
                                role="group"
                                aria-label={`${index + 1} / ${
                                  userStoriesListData.length
                                }`}
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
                                      viewers:- {user.viewers || ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-results">
                              No stories available
                            </div>
                          )}
                        </Carousel>
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

export default UserStories;
