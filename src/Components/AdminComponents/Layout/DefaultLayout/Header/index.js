import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../../../Store/Store";
import { actions } from "../../../../../Store/Index";

const Index = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const navigate = useNavigate();
  const btnLogout = () => {
    localStorage.removeItem("token");
    dispatch(actions.isLogin(true));
    navigate("/");
  };
  const showNavbar = () => {
    dispatch(actions.isShowSidebar(!state.isShowSidebar));
  };
  useEffect(() => {
    if (state.isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            id="sidebarCollapse"
            className={state.isShowSidebar ? "active navbar-btn" : "navbar-btn"}
            onClick={showNavbar}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to={"/"} className="link" onClick={btnLogout}>
              {" "}
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Index;
