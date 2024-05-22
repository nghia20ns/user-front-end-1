import React, { memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {
  const user = props.userProps;
  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate(`/users/${index}`);
  };
  return (
    <>
      <tr onClick={() => handleClick(user._id)} key={user._id}>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    </>
  );
};
export default memo(UserItem);

UserItem.propTypes = {
  userProps: PropTypes.object.isRequired,
};
