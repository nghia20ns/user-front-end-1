/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../Store/Store";
import { actions } from "../../../Store/Index";
import "../css/product.css";

const ProductItem = (props) => {
  const [state, dispatch] = useContext(Context);

  const product = props.productProps;
  const handleClick = props.handleClick;
  const handleNotClick = props.handleNotClick;
  // const checkAll = props.checkAll;
  const navigate = useNavigate();
  const clickItem = (index) => {
    navigate(`/products/${index}`);
  };

  //delete
  const deleteProduct = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_PORT}/products/delete/` + id)
      .then((res) => {
        if (res.data.status === "err") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const btnDelete = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      dispatch(actions.isAlert(true));
      dispatch(actions.showMessageAlert("delete successful"));
      deleteProduct(index);
      window.location.reload(false);
    }
  };

  const btnUpdate = (index) => {
    navigate(`/products/update/${index}`);
  };
  const changeIso8601 = (isoDate) => {
    const dateObject = new Date(isoDate);
    const normalDate = dateObject.toLocaleString("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
      formatMatcher: "best fit",
    });
    return normalDate;
  };

  //check input
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Add/Remove checked item from list
  // console.log(checkAll);
  const handleCheck = (event) => {
    if (event.target.checked) {
      handleClick(event.target.value);
    } else {
      handleNotClick(event.target.value);
    }
  };

  return (
    <>
      <tr key={product._id}>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            value={product._id}
            onChange={handleCheck}
            id=""
            checked={product.checked}
          />
        </td>

        <td
          onClick={() => clickItem(product._id)}
          className="hover-text"
          data-text={product.email}
        >
          <div className="limitText">{product.email}</div>
        </td>
        <td onClick={() => clickItem(product._id)}>{product.password}</td>
        <td onClick={() => clickItem(product._id)}>{product.provider}</td>
        <td onClick={() => clickItem(product._id)}>{product.status}</td>
        <td
          onClick={() => clickItem(product._id)}
          className="hover-text"
          data-text={product.email_recover ? product.email_recover : "none!"}
        >
          <div className="limitText">
            {product.email_recover ? product.email_recover : "none!"}
          </div>
        </td>

        <td onClick={() => clickItem(product._id)}>
          <div className="">{product.information}</div>
        </td>
        <td onClick={() => clickItem(product._id)}>
          {changeIso8601(product.createdAt)}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => btnUpdate(product._id)}
          >
            update
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => btnDelete(product._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
ProductItem.propTypes = {
  productProps: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  checkAll: PropTypes.bool.isRequired,
  handleNotClick: PropTypes.func.isRequired,
};
