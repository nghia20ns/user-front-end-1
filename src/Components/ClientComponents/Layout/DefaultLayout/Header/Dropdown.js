import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../../../Store/Store";
import { actions } from "../../../../../Store/Index";

const Dropdown = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const btnLogout = () => {
    localStorage.removeItem("token");
    dispatch(actions.isLogin(true));
  };
  return (
    <div className="flex flex-col dropDownProfile">
      <ul className="dropdown-item flex flex-col gap-4">
        <li className="dropdown-item">
          <Link to={"/profile"} className="dropdown-item">
            <b> Profile</b>
          </Link>
        </li>
        <li className="dropdown-item">
          <hr />
        </li>

        <li className="dropdown-item">
          <Link className="dropdown-item" onClick={btnLogout}>
            <b> Logout</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
