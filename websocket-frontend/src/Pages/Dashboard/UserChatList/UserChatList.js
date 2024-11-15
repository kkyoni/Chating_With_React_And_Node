import React, { useState, useEffect } from "react";

function UserChatList({ userListData, openChatModel }) {
  const userListImage = "images/avatar/";
  const [searchValue, setSearchValue] = useState(""); // State to hold the search value
  const [filteredUserList, setFilteredUserList] = useState(userListData); // State to hold filtered user list

  useEffect(() => {
    // Filter the user list when searchValue changes
    const filteredList = userListData.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase()) // Search match
    );
    setFilteredUserList(filteredList); // Update filtered list
  }, [searchValue, userListData]); // Re-run effect when searchValue or userListData changes

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); // Update search value on input change
  };

  return (
    <div className="tyn-aside tyn-aside-base">
      <div className="tyn-aside-head">
        <div className="tyn-aside-head-text">
          <h3 className="tyn-aside-title">Chats</h3>
        </div>
      </div>
      <div className="tyn-aside-body" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: "0px" }}>
          <div className="simplebar-mask">
            <div
              className="simplebar-content-wrapper"
              style={{ height: "100%", overflow: "hidden scroll" }}
            >
              <div className="simplebar-content" style={{ padding: "0px" }}>
                <div className="tyn-aside-search">
                  <div className="form-group tyn-pill">
                    <div className="form-control-wrap">
                      <div className="form-control-icon start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        id="search"
                        placeholder="Search contact / chat"
                        value={searchValue} // Bind the state to the input
                        onChange={handleSearchChange} // Handle change in input
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane show active"
                    id="all-chats"
                    role="tabpanel"
                  >
                    <ul className="tyn-aside-list">
                      {filteredUserList.length > 0 ? (
                        filteredUserList.map((user, index) => (
                          <li
                            className="tyn-aside-item js-toggle-main"
                            key={index}
                            onClick={() => openChatModel(user.id)}
                          >
                            <div className="tyn-media-group">
                              <div className="tyn-media tyn-size-lg">
                                <img
                                  src={`${userListImage}${user.avatar}`}
                                  alt={user.username}
                                />
                              </div>
                              <div className="tyn-media-col">
                                <div className="tyn-media-row">
                                  <h6 className="name">{user.username}</h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="no-results">No results found</li>
                      )}
                    </ul>
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

export default UserChatList;
