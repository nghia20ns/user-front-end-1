import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
const InfoUser = () => {
  const { id } = useParams();
  const [infoState, setInfoState] = useState({});
  const [apiKey, setApiKey] = useState("");

  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async (token) => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/users/` + id, {
        headers: {
          Authorization: `Bearer ${token.data.data.access_token}`,
        },
      })
      .then((res) => {
        setInfoState(res.data.data);
        setApiKey(res.data.data.api_key);
        if (res.data.status === "error") {
          navigate("/error");
        }
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
  const deleteUser = async (token) => {
    await axios
      .delete(`${process.env.REACT_APP_PORT}/users/delete/` + id, {
        headers: {
          Authorization: `Bearer ${token.data.data.access_token}`,
        },
      })
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "err") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFunc = () => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      if (JSON.parse(localStorage.getItem("token"))) {
        const token = JSON.parse(localStorage.getItem("token"));
        deleteUser(token);
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };
  const changeApiKey = async (token) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_PORT}/users/changeApiKey/` + id,
          {
            // Your request data goes here
          },
          {
            headers: {
              Authorization: `Bearer ${token.data.data.access_token}`,
            },
          }
        )
        .then((res) => {
          setApiKey(res.data.data.data.api_key);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const btnChange = (e) => {
    e.preventDefault();
    const result = window.confirm("Are you sure you want to change Api Key?");
    if (result) {
      if (JSON.parse(localStorage.getItem("token"))) {
        const token = JSON.parse(localStorage.getItem("token"));
        changeApiKey(token);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-3">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{infoState.information}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Email:</b> {infoState.email}{" "}
              </li>
              <li className="list-group-item">
                <b>Email Recover:</b>{" "}
                {infoState.email_recover !== " "
                  ? infoState.email_recover
                  : "none"}{" "}
              </li>
            </ul>
            <div className="card-body">
              <Link to={`/users/update/${id}`} className="card-link">
                Update
              </Link>
              <Link onClick={deleteFunc} className="card-link">
                Delete
              </Link>
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Email:</b>
            </li>
            <li className="list-group-item">
              <b>Api_key:</b>
            </li>
          </ul>
        </div>

        <div className="col-sm-4">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{infoState.email}</li>
            <li className="list-group-item">{apiKey}</li>
            <button type="submit" onClick={btnChange} className="btn btn-link">
              {" "}
              change API key
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};
export default memo(InfoUser);
