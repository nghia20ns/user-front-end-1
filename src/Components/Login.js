/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useContext, useEffect, useState } from "react";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";
import { Context } from "../Store/Store";
import { actions } from "../Store/Index";
const Login = () => {
  //  const [userState, setUserState] = useState([]);
  const [state, dispatch] = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getUsers = async () => {
    await axios
      .post(`${process.env.REACT_APP_PORT}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(actions.isLogin(false));
          localStorage.setItem("token", JSON.stringify(res));
        } else if (res.data.status === "error") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (state.isLogin === false) {
      navigate("/home");
    }
  }, [navigate, state.isLogin]);

  const loginFuc = (e) => {
    getUsers();
    e.preventDefault();
  };
  return (
    <>
      <div className="row" style={{ height: 100 }}>
        {state.isAlert && <Alert message={state.showMessageAlert} />}
      </div>

      <div className="container">
        <div className=" text-center mt-5 ">
          <h1>Login</h1>
        </div>
        <div className="row ">
          <div className="col-lg-7 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
              <div className="card-body bg-light">
                <div className="container">
                  <form id="contact-form" role="form" onSubmit={loginFuc}>
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_name">Email *</label>
                            <input
                              id="form_name"
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Please enter your email *"
                              required="required"
                              data-error="email is required."
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                              id="password"
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Please enter your password *"
                              required="required"
                              data-error="password is required."
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-12">
                          <input
                            type="submit"
                            className="btn btn-success btn-send  pt-2 btn-block"
                            value="Login"
                          />
                        </div>
                        <hr></hr>
                        <div className="col-md-12">
                          <Link
                            to={"/signup"}
                            className="btn btn-success btn-send  pt-2 btn-block"
                            defaultValue="Send Message"
                          >
                            {" "}
                            Signup
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /.8 */}
          </div>
          {/* /.row*/}
        </div>
      </div>
    </>
  );
};

export default Login;
