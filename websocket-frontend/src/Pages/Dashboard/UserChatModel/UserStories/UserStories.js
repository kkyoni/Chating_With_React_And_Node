import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { UserStoriesListActionHandler } from "../../../../Redux/Actions/common/UserStoriesList";
import { UserViewStoriesListActionHandler } from "../../../../Redux/Actions/common/UserViewStoriesList";
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

  const userviewstorieslistdata = useSelector(
    (state) => state?.UserViewStoriesListData?.user_view_stories_list_data
  );

  useEffect(() => {
    if (id) {
      dispatch(UserStoriesListActionHandler(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (userstorieslistdata) {
      setUserStoriesListData(userstorieslistdata.stories);
    }
  }, [userstorieslistdata]);

  useEffect(() => {
    if (userviewstorieslistdata) {
      setUserStoriesListData(userviewstorieslistdata.stories);
    }
  }, [userviewstorieslistdata]);

  const handleStoriesClose = () => {
    navigate(`/`);
  };

  const onCarouselChange = (currentIndex) => {
    if (userStoriesListData && userStoriesListData.length > 0) {
      const currentUser = userStoriesListData[currentIndex];
      if (currentUser) {
        const id = currentUser.id;
        const stories_id = currentUser.story_id;
        const receiverID = currentUser.user_id;
        dispatch(UserViewStoriesListActionHandler(id, stories_id, receiverID));
      }
    }
  };

  return (
    <div className="tyn-content tyn-stories tyn-stories-page has-aside-sticky">
      <div className="tyn-aside tyn-aside-sticky">
        <div className="tyn-aside-head">
          <div className="tyn-aside-head-text">
            <h3 className="tyn-aside-title tyn-title">Stories User List</h3>
          </div>
          <div className="tyn-aside-head-tools">
            <ul className="tyn-list-inline gap gap-3">
              <li>
                <button
                  className="btn btn-icon btn-light btn-md btn-pill"
                  onClick={handleStoriesClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
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
                          <div
                            className="swiper-slide swiper-slide-visible swiper-slide-active"
                            role="group"
                            aria-label="1 / 6"
                            style={{ width: "165.5px" }}
                          >
                            List Of Storie User
                          </div>
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

      <div className="tyn-content-inner d-flex align-items-center">
        <div className="tyn-stories-wrap">
          <div className="tyn-stories-slider swiper swiper-slider swiper-fade swiper-initialized swiper-horizontal swiper-pointer-events swiper-watch-progress swiper-backface-hidden">
            <Carousel arrows infinite={false} afterChange={onCarouselChange}>
              {userStoriesListData && userStoriesListData.length > 0 ? (
                userStoriesListData.map((user, index) => (
                  <div
                    key={index}
                    className="swiper-slide"
                    role="group"
                    aria-label={`${index + 1} / ${userStoriesListData.length}`}
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
                <div className="no-results">No stories available</div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStories;
