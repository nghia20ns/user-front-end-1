/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../Store/Store";
import { actions } from "../../../Store/Index";
import Alert from "../../Alert";

const Update = () => {
  const [password, setPassword] = useState("");
  const [infoState, setInfoState] = useState({});
  const [state, dispatch] = useContext(Context);

  const { id } = useParams();

  const navigate = useNavigate();

  const getUsers = async (token) => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/users/` + id, {
        headers: {
          Authorization: `Bearer ${token.data.data.access_token}`,
        },
      })
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "error") {
          navigate("/error");
        }
        if (res.data.status === "please login") {
          navigate("/");
        }
      })
      .catch(function (error) {
        navigate("/error");
      });
  };
  const updateUser = async (token) => {
    await axios
      .patch(
        `${process.env.REACT_APP_PORT}/users/userUpdate/` + id,
        {
          password: password,
          email_recover: infoState.email_recover,
        },
        {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "update ok") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
          navigate(-1);
        } else if (res.data.status === "email already exists") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "error") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "error email") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
        console.log("status:", res.data.status);
        console.log("message:", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      getUsers(token);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateFuc = (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      updateUser(token);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}

      <form id="contact-form" role="form" onSubmit={updateFuc}>
        <div className="controls">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="form_name">
                  <b>Email</b>
                </label>
                <input
                  id="form_name"
                  type="text"
                  className="form-control"
                  placeholder={infoState.email}
                  onChange={(e) =>
                    setInfoState({ ...infoState, email: e.target.value })
                  }
                  value={infoState.email}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Email Recover</b>
                </label>
                <input
                  id="email_recover"
                  type="text"
                  className="form-control"
                  placeholder={infoState.emailRecover}
                  onChange={(e) =>
                    setInfoState({
                      ...infoState,
                      email_recover: e.target.value,
                    })
                  }
                  value={infoState.email_recover}
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
                  placeholder="Please enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="col-md-12">
            <input
              type="submit"
              className="btn btn-success btn-send  pt-2 btn-block
                      "
              defaultValue="Send Message"
            />
          </div>
        </div>
      </form>

      <Link onClick={() => navigate(-1)} className="card-link">
        Back
      </Link>
    </>
  );
};

export default Update;
