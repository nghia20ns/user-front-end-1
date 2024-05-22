import React, { useContext, useEffect } from "react";
import { Context } from "../Store/Store";
import { actions } from "../Store/Index";

const Alert = ({ message }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);
  const deleteAlert = () => {
    dispatch(actions.isAlert(false));
    dispatch(actions.showMessageAlert(""));
  };
  useEffect(() => {
    setTimeout(deleteAlert, 5000);
  });

  return (
    <>
      <div>
        <div className="alert alert-danger" role="alert">
          {message}!
        </div>
      </div>
    </>
  );
};

export default Alert;
