import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { UserProfileListActionHandler } from "../../Redux/Actions/common/UserProfileList";

function Header() {
  const location = useLocation();
  const userListImage = "images/avatar/";
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState([]);
  const isActive = location.pathname;
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  const userprofilelistdata = useSelector(
    (state) => state?.UserProfileListData?.user_profile_list_data
  );

  const toggleTheme = (theme) => {
    setThemeMode(theme);
    localStorage.setItem("themeMode", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", themeMode);
  }, [themeMode]);

  const logoutHandler = () => {
    try {
      localStorage.clear();
      Navigate("/login");
      window.location.reload();
    } catch (error) {
      return {
        status: "error",
        message: "Error clearing localStorage",
        error: error,
      };
    }
  };

  useEffect(() => {
    dispatch(UserProfileListActionHandler());
  }, [dispatch]);

  useEffect(() => {
    if (userprofilelistdata) {
      setUserProfileData(userprofilelistdata.user);
    }
  }, [userprofilelistdata]);

  return (
    <nav className="tyn-appbar">
      <div className="tyn-appbar-wrap">
        <div className="tyn-appbar-logo">
          <Link to={"/"} className="tyn-logo">
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
          </Link>
        </div>

        <div className="tyn-appbar-content">
          <ul className="tyn-appbar-nav tyn-appbar-nav-start">
            <li
              className={`tyn-appbar-item ${
                isActive === "/addStoriesSettings" ? "active current-page" : ""
              }`}
              style={{ marginTop: "15px" }}
            >
              <Link className="tyn-appbar-link" to={"addStoriesSettings"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-subtract"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
                </svg>
                <span className="d-none">Add Stories</span>
              </Link>
            </li>
            <li
              className={`tyn-appbar-item ${
                isActive === "/stories" ? "active current-page" : ""
              }`}
              style={{ marginTop: "15px" }}
            >
              <Link className="tyn-appbar-link" to={"stories"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-safe-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.778 9.414A2 2 0 1 1 6.95 6.586a2 2 0 0 1 2.828 2.828"></path>
                  <path d="M2.5 0A1.5 1.5 0 0 0 1 1.5V3H.5a.5.5 0 0 0 0 1H1v3.5H.5a.5.5 0 0 0 0 1H1V12H.5a.5.5 0 0 0 0 1H1v1.5A1.5 1.5 0 0 0 2.5 16h12a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 14.5 0zm3.036 4.464 1.09 1.09a3 3 0 0 1 3.476 0l1.09-1.09a.5.5 0 1 1 .707.708l-1.09 1.09c.74 1.037.74 2.44 0 3.476l1.09 1.09a.5.5 0 1 1-.707.708l-1.09-1.09a3 3 0 0 1-3.476 0l-1.09 1.09a.5.5 0 1 1-.708-.708l1.09-1.09a3 3 0 0 1 0-3.476l-1.09-1.09a.5.5 0 1 1 .708-.708M14 6.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 1 0"></path>
                </svg>
                <span className="d-none">Stories</span>
              </Link>
            </li>
            <li
              className={`tyn-appbar-item ${
                isActive === "/faq" ? "active current-page" : ""
              }`}
              style={{ marginTop: "15px" }}
            >
              <Link className="tyn-appbar-link" to={"faq"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-question-octagon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927"></path>
                </svg>
                <span className="d-none">FAQ</span>
              </Link>
            </li>
          </ul>
          <ul className="tyn-appbar-nav tyn-appbar-nav-end">
            <li className="tyn-appbar-item" style={{ marginTop: "10px" }}>
              <div
                className="d-inline-flex dropdown-toggle"
                data-bs-auto-close="outside"
                data-bs-toggle="dropdown"
                data-bs-offset="0,10"
                aria-expanded="false"
              >
                <div className="tyn-media tyn-size-lg tyn-circle">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <div className="dropdown-gap">
                              <div className="tyn-media-group">
                                <div className="tyn-media tyn-size-lg">
                                  <img
                                    src={`${userListImage}${userProfileData.avatar}`}
                                    alt={userProfileData.username}
                                  />
                                </div>
                                <div className="tyn-media-col">
                                  <div className="tyn-media-row">
                                    <h6 className="name">
                                      {userProfileData.username}
                                    </h6>
                                    <div className="indicator varified">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-check-circle-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                        },
                        { type: "divider" },
                        {
                          label: (
                            <div className="dropdown-gap">
                              <div className="d-flex gap gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-moon-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"></path>
                                </svg>
                                <div>
                                  <h6>Darkmode</h6>
                                  <ul className="d-flex align-items-center gap gap-3">
                                    <li className="inline-flex">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="themeMode"
                                          id="dark"
                                          value="dark"
                                          onChange={() => toggleTheme("dark")}
                                          checked={themeMode === "dark"}
                                        />
                                        <label
                                          className="form-check-label small"
                                          for="dark"
                                        >
                                          {" "}
                                          On{" "}
                                        </label>
                                      </div>
                                    </li>
                                    <li className="inline-flex">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="themeMode"
                                          id="light"
                                          value="light"
                                          onChange={() => toggleTheme("light")}
                                          checked={themeMode === "light"}
                                        />
                                        <label
                                          className="form-check-label small"
                                          for="light"
                                        >
                                          {" "}
                                          Off{" "}
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ),
                        },
                        { type: "divider" },
                        {
                          label: (
                            <ul className="tyn-list-links">
                              <li>
                                <Link to={"/profile"}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-person"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                                  </svg>
                                  <span>Profile</span>
                                </Link>
                              </li>
                              <li>
                                <Link href="profile.html#profile-settings">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-gear"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"></path>
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"></path>
                                  </svg>
                                  <span>Settings</span>
                                </Link>
                              </li>
                              <li>
                                <Link to={"profile-change-password"}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-unlock"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"></path>
                                  </svg>
                                  <span>Change Password</span>
                                </Link>
                              </li>
                            </ul>
                          ),
                        },
                        { type: "divider" },
                        {
                          label: (
                            <ul className="tyn-list-links">
                              <li>
                                <Link onClick={logoutHandler}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-power"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M7.5 1v7h1V1z"></path>
                                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
                                  </svg>
                                  <span>Log Out</span>
                                </Link>
                              </li>
                            </ul>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      <Space>
                        <img
                          src={`${userListImage}${userProfileData.avatar}`}
                          alt={userProfileData.username}
                        />
                      </Space>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
