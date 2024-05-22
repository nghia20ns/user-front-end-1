import axios from "axios";
import React, { memo, useContext, useEffect, useState } from "react";
import UserItem from "./UserItem";
import ReactPaginate from "react-paginate";
import "../css/manager.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Store/Store";
import { actions } from "../../../Store/Index";

const User = () => {
  // const [userState, setUserState] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();

  const [state, dispatch] = useContext(Context);

  const getUsers = async (page, token) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_PORT}/users/getUser/${page}`, {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        })
        .then((res) => {
          if (res.data.status === "please login") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          }
          if (res.data.status === "token expired") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          } else {
            dispatch(actions.showAllUser(res.data.data));
            // setUserState(res.data.data);
            // setTotalPage(res.data.data.length % 5);
            setTotalPage(res.data.page);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));

      getUsers(1, token);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePageClick = (event) => {
    getUsers(event.selected + 1, JSON.parse(localStorage.getItem("token")));
  };
  //xu ly cong
  const btnAdd = () => {
    navigate("/users/add");
  };
  return (
    <>
      <div className="row">
        <div className="input-group mb-3">
          <form className="search-form">
            <input
              type="text"
              id="searchInput"
              name="search"
              placeholder="find..."
              // onChange={(e) => setSearchInput(e.target.value)}
              // value={searchInput}
            />
          </form>
        </div>
      </div>

      <div style={{ height: 500 }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {state.showAllUser.map((user) => {
              return <UserItem key={user._id} userProps={user} />;
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
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
      <div className="app">
        <button className="add-button" onClick={btnAdd}>
          +
        </button>
      </div>
    </>
  );
};

export default memo(User);
