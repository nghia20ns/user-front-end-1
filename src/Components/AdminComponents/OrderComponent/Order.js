import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import { actions } from "../../../Store/Index";
import { Context } from "../../../Store/Store";

const Order = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const [transState, setTransState] = useState([]);
  const [totalTrans, setTotalTrans] = useState(0);

  const navigate = useNavigate();

  const getTrans = async (page, token) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_PORT}/orders/getall/${page}`, {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        })
        .then((res) => {
          if (res.data.status === "please login") {
            navigate("/");
          }
          if (res.data.status === "token expired") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          } else {
            setTransState(res.data.data);
            setTotalTrans(res.data.page);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));

      getTrans(1, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePageClick = (event) => {
    getTrans(event.selected + 1, JSON.parse(localStorage.getItem("token")));
  };

  return (
    <>
      <div style={{ height: 500 }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">UserId</th>
              <th scope="col">Provider</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transState.map((trans) => {
              return <OrderItem key={trans._id} transProps={trans} />;
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalTrans}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Order;
