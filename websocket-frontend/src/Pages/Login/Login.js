import React, { useEffect } from "react";
import "./Login.css";
import { Form, Input, Button } from "antd";
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
  }, [logindata, Navigate]);

  useEffect(() => {
    let token = localStorage.getItem("userDetails");
    if (token) {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <div className="d-lg-flex half">
      <div
        className="bg order-1 order-md-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h3>
                Login to <strong>Colorlib</strong>
              </h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
              <Form
                name="loginForm"
                initialValues={{ email: "", password: "" }}
                onFinish={onFinish}
                className="modal-content animate loginForm"
              >
                <div className="form-group first">
                  <label htmlFor="username">Email</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      {
                        type: "Email",
                        message: "Please enter a valid Email address",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your Email"
                      className="form-control"
                      id="username"
                    />
                  </Form.Item>
                </div>
                <div className="form-group last mb-3">
                  <label htmlFor="password">Password</label>
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
                      className="form-control"
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
