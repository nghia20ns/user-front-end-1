import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductList from "./ProductList";

const OrderInfo = () => {
  const { id } = useParams();
  const [infoState, setInfoState] = useState({});
  const navigate = useNavigate();
  const [productState, setProductState] = useState([]);

  const getTrans = async () => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/orders/` + id)
      .then((res) => {
        setInfoState(res.data.data);
        setProductState(res.data.data.products);
        if (res.data.status === "error") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getTrans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>User Id</b>
            </li>
            <li className="list-group-item">
              <b>Quantity</b>
            </li>
            <li className="list-group-item">
              <b>Provider</b>
            </li>
            <li className="list-group-item">
              <b>Message</b>
            </li>
            <li className="list-group-item">
              <b>Status</b>
            </li>
            <li className="list-group-item">
              <b>Product</b>
            </li>
            <li className="list-group-item">
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{infoState.userId}</li>
            <li className="list-group-item">{infoState.quantity}</li>
            <li className="list-group-item">{infoState.provider}</li>
            <li className="list-group-item">
              {infoState.message !== " " ? infoState.message : "none"}
            </li>
            <li className="list-group-item">{infoState.status}</li>
            {productState.map((product) => {
              return <ProductList key={product.email} productProps={product} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
