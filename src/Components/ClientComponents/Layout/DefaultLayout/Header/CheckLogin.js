import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

export const Login = () => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <ul className="navbar-nav  mb-2 mb-lg-0">
        <li className="nav-item">
          <button
            className="navbar-brand btnAvt"
            aria-current="page"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <img
              src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
              className="img-fluid"
              alt="avt"
            />
          </button>
        </li>
      </ul>
      {openProfile && <Dropdown />}
    </>
  );
};

export const NoLogin = () => {
  return (
    <>
      {" "}
      <ul className="navbar-nav  mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={"/"} type="button" className="btn btn-light">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/signup"} type="button" className="btn btn-light">
            Signup
          </Link>
        </li>
      </ul>
    </>
  );
};
