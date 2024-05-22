import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../../../css/header.css";
import { Context } from "../../../../../Store/Store";
import { Login, NoLogin } from "./CheckLogin";
// import { actions } from "../../../../../Store/Index";

const Index = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  return (
    <>
      {" "}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to={"/home"} aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="navbar-brand"
                  to={"/about"}
                  aria-current="page"
                >
                  about
                </Link>
              </li>
            </ul>

            {state.isLogin ? <NoLogin /> : <Login />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Index;
