import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <div className="sidebar-header">
        <h3>MANAGER</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/users" className="link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/products" className="link">
            Accounts
          </Link>
        </li>
        <li>
          <Link to="/orders" className="link">
            Orders
          </Link>
        </li>
      </ul>
      {/* <ul className="list-unstyled CTAs">
        <li>
          <Link to="#" className="download">
            Logout
          </Link>
        </li>
        <li>
          <Link to="#" className="article">
            Profile
          </Link>
        </li>
      </ul> */}
    </>
  );
};
export default index;
