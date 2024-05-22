import Header from "./Header";
import SlideBar from "./SlideBar";
import React, { useContext } from "react";
import "../../css/style.css";
import { Context } from "../../../../Store/Store";

const DefaultLayout = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <div className="wrapper" style={{}}>
        <nav id="sidebar" className={state.isShowSidebar ? "active" : ""}>
          <SlideBar />{" "}
        </nav>

        <div id="content" style={{ width: "100%" }}>
          <nav className="navbar navbar-default">{<Header />}</nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
