/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./css/home.css";
import axios from "axios";
import Modal from "./OrderModal";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Store/Store";
import { actions } from "../../Store/Index";
import Alert from "../Alert";

const Home = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeAccount, setTypeAccount] = useState("");
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/clients/getAccount`)
      .then((res) => {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Order = async (token) => {
    await axios
      .get(
        `${process.env.REACT_APP_PORT}/products/buy?quantity=${orderData.quantity}&provider=${typeAccount}`,
        {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "token expired") {
          localStorage.removeItem("token");
          dispatch(actions.isLogin(true));
          navigate("/");
        }
        if (res.data.status === "success") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
          navigate("/profile");
        } else if (res.data.status === "error") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const btnByAccount = (account) => {
    openModal();
    setTypeAccount(account);
  };
  const orderFuc = (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      Order(token);
    } else {
      navigate("/");
    }
    closeModal();
  };
  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}

      <div style={{ marginLeft: 10 }}>
        <div className="row">
          <div className="col-sm-5">
            DELIVERY ACCOUNT COMMITMENT
            <br />
            Each account sold is unique and sold only once (No resell) <br />
            All accounts were created within the last 4 hours and are Continuous
            testing before selling out.
            <br />
            We guarantee the sold account will live at least 24 hours (account
            normal) and at least 6-12 months (TRUSTED account)
            <br />
          </div>
          <div className="col-sm-7">
            MORE PROMOTION FROM US
            <br /> Regular customer offer - deposit more and you get better
            rates with up to 20% discount
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Email</td>
                  <td>5$</td>
                  <td>
                    {" "}
                    {data.gmailNotSold ? data.gmailNotSold : "loading..."}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => btnByAccount("gmail")}
                      value={"gmail"}
                    >
                      By Gmail
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Hotmail</td>
                  <td>5$</td>
                  <td>
                    {data.hotmailNotSold ? data.hotmailNotSold : "loading..."}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => btnByAccount("hotmail")}
                    >
                      By Hotmail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h4>By {typeAccount}</h4> <hr />
        <form className="row g-3" onSubmit={orderFuc}>
          <div className="col-md-6">
            <label htmlFor="quantity" className="form-label">
              QUANTITY
            </label>
            <input
              required="required"
              data-error="quantity is required."
              type="number"
              min={1}
              className="form-control"
              id="quantity"
              onChange={(e) =>
                setOrderData({ ...orderData, quantity: e.target.value })
              }
              value={orderData.quantity}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="provider" className="form-label">
              PROVIDER
            </label>
            <p className="form-control">{typeAccount}</p>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Order
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Home;
