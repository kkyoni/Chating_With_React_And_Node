import React, { useState, useEffect } from "react";
import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { LoginActionHandler } from "../../Redux/Actions/common/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from "../../images/bg_1.jpg";

function Login() {
  let dispatch = useDispatch();
  let Navigate = useNavigate();

  const logindata = useSelector((state) => state?.LoginData?.login_data);

  const onFinish = (values) => {
    dispatch(LoginActionHandler(values));
  };

  useEffect(() => {
    if (logindata) {
      localStorage.setItem("userDetails", JSON.stringify(logindata));
      Navigate("/");
    }
  }, [logindata]);

  useEffect(() => {
    let token = localStorage.getItem("userDetails");
    if (token) {
      Navigate("/");
    }
  }, []);
  return (
    <div class="d-lg-flex half">
      <div
        class="bg order-1 order-md-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div class="contents order-2 order-md-1">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <h3>
                Login to <strong>Colorlib</strong>
              </h3>
              <p class="mb-4">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
              <Form
                name="loginForm"
                initialValues={{ username: "", password: "" }}
                onFinish={onFinish}
                className="modal-content animate loginForm"
              >

                <div class="form-group first">
                  <label for="username">Username</label>
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Please input your username!" },
                      {
                        type: "username",
                        message: "Please enter a valid username address",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your username"
                      class="form-control"
                      id="username"
                    />
                  </Form.Item>
                </div>
                <div class="form-group last mb-3">
                  <label for="password">Password</label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter your password"
                      class="form-control"
                      id="password"
                    />
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="btn btn-block btn-primary"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
