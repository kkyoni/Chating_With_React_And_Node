import React, { useEffect, useState } from "react";
import coverImage from "../../images/cover/2.jpg";
import { Form, Input, Button } from "antd";
import { UserProfileListActionHandler } from "../../Redux/Actions/common/UserProfileList";
import { UpdateUserChangePasswordActionHandler } from "../../Redux/Actions/common/UpdateUserChangePasswordList";
import { useDispatch, useSelector } from "react-redux";

function ChangePassword() {
  const userListImage = "images/avatar/";
  const dispatch = useDispatch();
  const [userProfileData, setUserProfileData] = useState(null);

  const userprofilelistdata = useSelector(
    (state) => state?.UserProfileListData?.user_profile_list_data
  );

  const onFinish = (values) => {
    dispatch(UpdateUserChangePasswordActionHandler(values));
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
    <div className="tyn-content tyn-content-page">
      <div className="tyn-main tyn-content-inner" id="tynMain">
        <div className="container">
          <div className="tyn-profile">
            <div className="tyn-profile-head">
              <div className="tyn-profile-cover">
                <img
                  className="tyn-profile-cover-image"
                  src={coverImage}
                  alt="Cover"
                />
              </div>
              <div className="tyn-profile-info">
                <div className="tyn-media-group align-items-start">
                  <div className="tyn-media tyn-media-bordered tyn-size-4xl tyn-profile-avatar">
                    <img
                      src={`${userListImage}${userProfileData?.avatar}`}
                      alt={userProfileData?.username || "Loading..."}
                    />
                  </div>
                  <div className="tyn-media-col">
                    <div className="tyn-media-row">
                      <h4 className="name">
                        {userProfileData?.username || "Loading..."}
                      </h4>
                    </div>
                    <div className="tyn-media-row has-dot-sap">
                      <span className="meta">{userProfileData?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tyn-profile-nav">
              <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                    type="button"
                    aria-selected="true"
                    role="tab"
                  >
                    Edit Profile
                  </button>
                </li>
              </ul>
            </div>
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
                        <div className="col-lg-3">
                          <h6>Personal Information</h6>
                          <div className="tyn-subtext">
                            Edit your personal info
                          </div>
                        </div>
                        <div className="col-lg-9">
                          {userProfileData && (
                            <Form
                              name="profileForm"
                              initialValues={{
                                old_password: "",
                                new_password: "",
                              }}
                              onFinish={onFinish}
                              className="modal-content animate profileForm"
                            >
                              <div className="row g-gs">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      className="form-label"
                                      htmlFor="firstName"
                                    >
                                      Old Password
                                    </label>
                                    <Form.Item
                                      name="old_password"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your Old Password!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Old Password"
                                        className="form-control"
                                        id="existingPassword"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      className="form-label"
                                      htmlFor="primaryEmail"
                                    >
                                      New Password
                                    </label>
                                    <Form.Item
                                      name="new_password"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your New Password!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="New Password"
                                        className="form-control"
                                        id="newPassword"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      className="form-label"
                                      htmlFor="primaryEmail"
                                    >
                                      Confirm Password
                                    </label>
                                    <Form.Item
                                      name="confirm_password"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your Confirm Password!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        id="confirmPassword"
                                      />
                                    </Form.Item>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <Form.Item>
                                      <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        className="btn btn-block btn-primary"
                                      >
                                        Save
                                      </Button>
                                    </Form.Item>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )}
                          {!userProfileData && <p>Loading profile...</p>}
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

export default ChangePassword;
