import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { Context } from "../Store/Store";
import { actions } from "../Store/Index";

const Signup = () => {
  const [state, dispatch] = useContext(Context);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const createUser = async () => {
    await axios
      .post(`${process.env.REACT_APP_PORT}/users/signup`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "sign success") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
          navigate("/");
        } else if (res.data.status === "error email") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "email existed") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createFunc = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      createUser();
    } else {
      dispatch(actions.isAlert(true));
      dispatch(actions.showMessageAlert("Please enter the correct password"));
    }
  };

  return (
    <>
      <div className="row" style={{ height: 100 }}>
        {state.isAlert && <Alert message={state.showMessageAlert} />}
      </div>

      <div className="container">
        <div className=" text-center mt-5 ">
          <h1>Signup</h1>
        </div>
        <div className="row ">
          <div className="col-lg-7 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
              <div className="card-body bg-light">
                <div className="container">
                  {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                  <form id="contact-form" role="form" onSubmit={createFunc}>
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-12">
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
                      </div>
                      <div className="row">
                        <div className="col-md-12">
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
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="confirm password">
                              Confirm Password *
                            </label>
                            <input
                              id="confirm password"
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Please enter your confirm password *"
                              required="required"
                              data-error="confirm password is required."
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
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
                            defaultValue="Signup"
                          />
                        </div>
                        <hr></hr>
                        <div className="col-md-12">
                          <Link
                            to={"/"}
                            className="btn btn-success btn-send  pt-2 btn-block"
                            defaultValue="Send Message"
                          >
                            {" "}
                            Login
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
export default Signup;
