import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const InfoProduct = () => {
  const { id } = useParams();
  const [infoState, setInfoState] = useState({});
  const navigate = useNavigate();
  const getProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/products/` + id)
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "error") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteProduct = async () => {
    await axios
      .delete(`${process.env.REACT_APP_PORT}/products/delete/` + id)
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
      deleteProduct();
      navigate(-1);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col sm 5">
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
                <b>Email:</b> {infoState.email}
              </li>
              <li className="list-group-item">
                <b>Email Recover:</b>
                {infoState.email_recover !== ""
                  ? infoState.email_recover
                  : "none"}
              </li>
            </ul>
            <div className="card-body">
              <Link to={`/products/update/${id}`} className="card-link">
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
              <b>Password:</b>
            </li>
            <li className="list-group-item">
              <b>Email Recover:</b>
            </li>
            <li className="list-group-item">
              <b>Status:</b>
            </li>
            <li className="list-group-item">
              <b>information:</b>
            </li>
            <li className="list-group-item">
              <b>Provider:</b>
            </li>
            <li className="list-group-item">
              <b>Message:</b>
            </li>
            <li className="list-group-item">
              <b>Order Id:</b>
            </li>
          </ul>
        </div>

        <div className="col-sm-4">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{infoState.email}</li>
            <li className="list-group-item">{infoState.password}</li>
            <li className="list-group-item">
              {infoState.email_recover !== ""
                ? infoState.email_recover
                : "None"}
            </li>
            <li className="list-group-item">
              {" "}
              {infoState.status !== " " ? infoState.status : "None"}
            </li>
            <li className="list-group-item">
              {" "}
              {infoState.information !== " " ? infoState.information : "None"}
            </li>
            <li className="list-group-item">
              {" "}
              {infoState.provider !== " " ? infoState.provider : "None"}
            </li>
            <li className="list-group-item">
              {" "}
              {infoState.message !== " " ? infoState.message : "None"}
            </li>
            <li className="list-group-item">
              {" "}
              {infoState.tranId !== " " ? infoState.tranId : "None"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InfoProduct;
