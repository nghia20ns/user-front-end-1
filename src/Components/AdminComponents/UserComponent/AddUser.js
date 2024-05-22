/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../Store/Store";
import { actions } from "../../../Store/Index";
import Alert from "../../Alert";

const AddUser = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [state, dispatch] = useContext(Context);

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
          navigate("/users");
        } else if (res.data.status === "error email") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "email existed") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createFunc = (e) => {
    e.preventDefault();
    console.log(e);
    createUser();
  };
  return (
    <>
      <div className="row" style={{ height: 100 }}>
        {state.isAlert && <Alert message={state.showMessageAlert} />}
      </div>
      <form id="contact-form" role="form" onSubmit={createFunc}>
        <div className="controls">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Email</b>
                </label>
                <input
                  id="email_recover"
                  type="text"
                  className="form-control"
                  placeholder="Please enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Password</b>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <input
                type="submit"
                className="btn btn-success btn-send  pt-2 btn-block
                      "
                defaultValue="Send Message"
              />
            </div>
            <div className="col-md-4">
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddUser;
