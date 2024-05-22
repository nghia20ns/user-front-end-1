import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductItem from "./ProductItem";
import ReactPaginate from "react-paginate";
import "../css/product.css";
import { Context } from "../../../Store/Store";
import Alert from "../../Alert";
import { actions } from "../../../Store/Index";

const Product = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const [productSate, setProductState] = useState([]);
  const [totalPage, setTotalPage] = useState(100);

  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  //filter variable
  const [checkAll, setCheckAll] = useState(false);

  const [checkFilter, setCheckFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  //page, sort variable width query
  const query = useQuery();
  const pageNow = query.get("page") ? parseInt(query.get("page")) : 1;
  const [page, setPage] = useState(pageNow);
  const sortEmail = query.get("sortEmail") ? query.get("sortEmail") : "";
  const sortStatus = query.get("sortStatus") ? query.get("sortStatus") : "";
  const sortCreatedAt = query.get("sortCreatedAt")
    ? query.get("sortCreatedAt")
    : "";
  const sortProvider = query.get("sortProvider")
    ? query.get("sortProvider")
    : "";

  const createdAt = query.get("createdAt") ? query.get("createdAt") : "";
  const recoverEmail = query.get("recoverEmail")
    ? query.get("recoverEmail")
    : "";
  const status = query.get("status") ? query.get("status") : "";
  const provider = query.get("provider") ? query.get("provider") : "";
  const information = query.get("information") ? query.get("information") : "";

  //function show product

  const getProduct = async (page, token) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("search", search);
      queryParams.append("sortEmail", sortEmail);
      queryParams.append("sortStatus", sortStatus);
      queryParams.append("sortProvider", sortProvider);
      queryParams.append("sortCreatedAt", sortCreatedAt);
      //filter
      queryParams.append("createdAt", createdAt);
      queryParams.append("recoverEmail", recoverEmail);
      queryParams.append("status", status);
      queryParams.append("provider", provider);
      queryParams.append("information", information);
      const filter = queryParams.toString();
      console.log(filter);
      await axios
        .get(
          `${process.env.REACT_APP_PORT}/products/get/${page}/15?${filter}`,

          {
            headers: {
              Authorization: `Bearer ${token.data.data.access_token}`,
            },
          }
        )
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
            const productsWithChecked = res.data.data.map((product) => ({
              ...product,
              checked: false,
            }));
            setProductState(productsWithChecked);
            setTotalPage(res.data.page);
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
      getProduct(page, token);
    } else {
      navigate("/");
    }
    let queryParams = `/products/?page=${page}`;
    if (sortEmail) {
      queryParams += `&sortEmail=${sortEmail}`;
    } else if (sortStatus) {
      queryParams += `&sortStatus=${sortStatus}`;
    } else if (sortProvider) {
      queryParams += `&sortProvider=${sortProvider}`;
    } else if (sortCreatedAt) {
      queryParams += `&sortCreatedAt=${sortCreatedAt}`;
    }
    if (!checkFilter) {
      navigate(queryParams);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, query]);
  const handlePageClick = (event) => {
    setCheckAll(false);

    setPage(event.selected + 1);
  };

  const btnSortProvider = () => {
    if (sortProvider === "decrease") {
      navigate(`/products/?page=${page}&sortProvider=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortProvider=decrease`);
    }
  };
  const btnSortStatus = () => {
    if (sortStatus === "decrease") {
      navigate(`/products/?page=${page}&sortStatus=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortStatus=decrease`);
    }
  };
  const btnSortEmail = () => {
    if (sortEmail === "decrease") {
      navigate(`/products/?page=${page}&sortEmail=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortEmail=decrease`);
    }
  };
  const btnSortCreatedAt = () => {
    if (sortCreatedAt === "decrease") {
      navigate(`/products/?page=${page}&sortCreatedAt=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortCreatedAt=decrease`);
    }
  };

  //checked

  const handleClick = (id) => {
    setProductState((pre) =>
      pre.map((product) =>
        product._id === id ? { ...product, checked: true } : product
      )
    );
  };
  const handleNotClick = (id) => {
    setProductState((pre) =>
      pre.map((product) =>
        product._id === id ? { ...product, checked: false } : product
      )
    );
  };
  useEffect(() => {
    let queryParams = `/products/?page=${page}`;
    if (dataFilter.createdAt) {
      queryParams += `&ceratedAt=${dataFilter.createdAt}`;
    } else if (dataFilter.recoverEmail) {
      queryParams += `&recoverEmail=${dataFilter.recoverEmail}`;
    } else if (dataFilter.status) {
      queryParams += `&status=${dataFilter.status}`;
    } else if (dataFilter.provider) {
      queryParams += `&provider=${dataFilter.provider}`;
    } else if (dataFilter.information) {
      queryParams += `&information=${dataFilter.information}`;
    }
    if (checkFilter) {
      navigate(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkFilter]);
  useEffect(() => {
    const checkedProducts = productSate.filter((product) => product.checked);
    const checkedIds = checkedProducts.map((product) => product._id);
    setChecked(checkedIds);
  }, [productSate]);
  useEffect(() => {
    if (checkAll) {
      const updatedProducts = productSate.map((product) => ({
        ...product,
        checked: true,
      }));
      setProductState(updatedProducts);
    } else {
      const updatedProducts = productSate.map((product) => ({
        ...product,
        checked: false,
      }));
      setProductState(updatedProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAll]);

  //filter
  const filterFunc = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(dataFilter);
    const filter = queryParams.toString();
    navigate(`/products/?page=${page}&${filter}`);
  };
  console.log(checked);
  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <form className="search-form">
              <input
                type="text"
                id="searchInput"
                name="search"
                placeholder="find..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>
          </div>
          <div className="col-sm-9">
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <form role="form" onSubmit={filterFunc}>
              <div className="row">
                <div className="col-sm-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDataFilter({
                        ...dataFilter,
                        createdAt: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Created at</option>
                    <option value={"1m"}>1 minute ago</option>
                    <option value={"1h"}>1 hour ago</option>
                    <option value={"1d"}>1 day ago</option>
                    <option value={"3d"}>3 day ago</option>
                    <option value={"10d"}>10 day ago</option>
                    <option value={"1month"}>1 month ago</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDataFilter({
                        ...dataFilter,
                        recoverEmail: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Recover Email</option>
                    <option value={"available"}>available</option>
                    <option value={"notAvailable"}>not available</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDataFilter({
                        ...dataFilter,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Status</option>
                    <option value={"sold"}>sold</option>
                    <option value={"notSoldYet"}>not sold yet</option>
                  </select>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-sm-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDataFilter({
                        ...dataFilter,
                        provider: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Provider</option>
                    <option value={"gmail"}>Gmail</option>
                    <option value={"hotmail"}>Hotmail</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setDataFilter({
                        ...dataFilter,
                        information: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Information</option>
                    <option value={"available"}>available</option>
                    <option value={"notAvailable"}>not available</option>
                  </select>
                </div>
                <div className="col-sm-1">
                  <input
                    onClick={(e) => {
                      setCheckFilter(true);
                    }}
                    type="submit"
                    value="filter"
                    className="btn btn-info"
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={(e) => {
                      setDataFilter({});
                      setCheckFilter(false);
                      // window.location.reload(true);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <div className="row">
          <div style={{ height: "100%" }} className="table-container">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      // onClick={btnCheckAll}
                      onChange={(e) => {
                        setCheckAll(!checkAll);
                      }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      checked={checkAll}
                    />
                  </th>
                  <th scope="col">
                    <div className="row">
                      <div className="col-sm-9">Email</div>
                      <div className="col-sm-3">
                        <img
                          onClick={btnSortEmail}
                          className="img-sort"
                          src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                          alt=""
                          width={15}
                          height={15}
                        ></img>
                      </div>
                    </div>
                  </th>
                  <th scope="col">Password</th>
                  <th scope="col">
                    <div className="row">
                      <div className="col-sm-9">Provider</div>
                      <div className="col-sm-3">
                        <img
                          onClick={btnSortProvider}
                          className="img-sort"
                          src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                          alt=""
                          width={15}
                          height={15}
                        ></img>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="row">
                      <div className="col-sm-9">Status</div>
                      <div className="col-sm-3">
                        <img
                          onClick={btnSortStatus}
                          className="img-sort"
                          src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                          alt=""
                          width={15}
                          height={15}
                        ></img>
                      </div>
                    </div>
                  </th>
                  <th scope="col">EMAIL RECOVER</th>
                  <th scope="col">INFORMATION</th>
                  <th scope="col">
                    <div className="row">
                      <div className="col-sm-9">CREATED AT</div>
                      <div className="col-sm-3">
                        <img
                          onClick={btnSortCreatedAt}
                          className="img-sort"
                          src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                          alt=""
                          width={15}
                          height={15}
                        ></img>
                      </div>
                    </div>
                  </th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {productSate.map((product) => {
                  return (
                    <ProductItem
                      key={product._id}
                      productProps={product}
                      handleClick={handleClick}
                      handleNotClick={handleNotClick}
                      checkAll={checkAll}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination-wrapper">
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
            initialPage={page - 1}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
