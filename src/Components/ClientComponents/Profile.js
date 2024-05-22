/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Store/Store";
import { actions } from "../../Store/Index";
import Alert from "../Alert";
import Modal from "./OrderModal";
import AccountItem from "./AccountItem";

const Profile = () => {
  const [state, dispatch] = useContext(Context);

  const navigate = useNavigate();
  const [infoState, setInfoState] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [information, setInformation] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [showImage, setShowImage] = useState();
  const [transState, setTransState] = useState([]);

  const changePassword = async (token) => {
    await axios
      .post(
        `${process.env.REACT_APP_PORT}/clients/changePassword`,
        {
          oldPassword: infoState.oldPassword,
          newPassword: infoState.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "error") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        }
        console.log("status:", res.data.status);
        console.log("message:", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeFunc = (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      changePassword(token);
      closeModal();
    } else {
      dispatch(actions.isAlert(true));
      dispatch(actions.showMessageAlert("please login!"));

      navigate("/");
    }
  };
  const getClient = async (token) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_PORT}/clients/getInformation`,

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
          } else if (res.data.status === "token expired") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          } else if (res.data.status === "error") {
            dispatch(actions.isAlert(true));
            dispatch(actions.showMessageAlert(res.data.message));
          }
          if (res.data.status === "success") {
            setShowImage("http://localhost:3005/" + res.data.data.avatar);
            setInformation({
              avatar: res.data.data.avatar,
              email: res.data.data.email,
              email_recover: res.data.data.email_recover,
              api_key: res.data.data.api_key,
              createdAt: res.data.data.createdAt,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      getClient(token);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // // Hàm xử lý khi người dùng chọn ảnh
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0]; // Lấy file ảnh từ sự kiện onchange
  //   const reader = new FileReader(); // Tạo một FileReader để đọc file

  //   reader.onloadend = () => {
  //     // Khi FileReader hoàn thành việc đọc file, cập nhật state với đường dẫn của ảnh
  //     setAvatar(reader.result);
  //   };

  //   if (file) {
  //     // Nếu có file, đọc file ảnh
  //     reader.readAsDataURL(file);
  //   }
  // };
  const displaySelectedImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setShowImage(e.target.result);
        setSelectedImage(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  console.log(selectedImage);
  //func upload avt
  const uploadAvt = async (token) => {
    const formData = new FormData();
    formData.append("filename", selectedImage);

    await axios
      .post(`${process.env.REACT_APP_PORT}/clients/uploadProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token.data.data.access_token}`,
        },
      })
      .then((res) => {
        if (res.data.status === "error") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert(res.data.message));
        } else if (res.data.status === "success") {
          dispatch(actions.isAlert(true));
          dispatch(actions.showMessageAlert("change avatar successful"));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpload = () => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));
      uploadAvt(token);
    } else {
      navigate("/");
    }
  };

  //get account
  // http://localhost:3005/api/clients/showAccount
  const getTrans = async (page, token) => {
    try {
      await axios
        .get(`${process.env.REACT_APP_PORT}/clients/showAccount`, {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        })
        .then((res) => {
          if (res.data.status === "please login") {
            navigate("/");
          }
          if (res.data.status === "token expired") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          } else {
            setTransState(res.data.data);
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

      getTrans(1, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}

      <div className="row">
        <div className="col-sm-3">
          <div className="card" style={{ width: "18rem" }}>
            <div>
              <div className="d-flex justify-content-center mb-4">
                <img
                  id="selectedAvatar"
                  src={showImage}
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt="selected avatar"
                />
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Image actions"
                >
                  <div className="btn btn-primary btn-rounded">
                    <label
                      className="form-label text-white m-1"
                      htmlFor="customFile2"
                    >
                      Change avatar
                    </label>
                    <input
                      type="file"
                      name="filename"
                      className="form-control d-none"
                      id="customFile2"
                      onChange={(event) => displaySelectedImage(event)}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-rounded"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Email:</b> {information.email}{" "}
              </li>
              <li className="list-group-item">
                <b>Email Recover:</b>{" "}
                {information.email_recover !== " "
                  ? information.email_recover
                  : "none"}{" "}
              </li>
            </ul>
            <div className="card-body">
              <Link to="" className="card-link" onClick={() => openModal()}>
                Change Password
              </Link>
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-9">
          {" "}
          <div style={{ height: 500 }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {transState.map((trans) => {
                  return <AccountItem key={trans._id} transProps={trans} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h4>Change Password</h4> <hr />
        <form id="contact-form" role="form" onSubmit={changeFunc}>
          <div className="controls">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="form_email">
                    <b>Old Password</b>
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      setInfoState({
                        ...infoState,
                        oldPassword: e.target.value,
                      })
                    }
                    // value=""
                    required="required"
                    data-error="Please fill in this field."
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="form_email">
                    <b>New Password</b>
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      setInfoState({
                        ...infoState,
                        newPassword: e.target.value,
                      })
                    }
                    // value=""
                    required="required"
                    data-error="Please fill in this field."
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="form_email">
                    <b>Recover Password</b>
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder=""
                    onChange={(e) =>
                      setInfoState({
                        ...infoState,
                        recoverPassword: e.target.value,
                      })
                    }
                    // value=""
                    required="required"
                    data-error="Please fill in this field."
                  />
                  <label
                    htmlFor="form_email"
                    style={{
                      color:
                        infoState.newPassword !== infoState.recoverPassword
                          ? "red"
                          : "black",
                    }}
                  >
                    {infoState.newPassword !== infoState.recoverPassword &&
                      "The re-entered password does not match"}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <input
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                ></input>
                Show password
              </div>
            </div>
            <div className="col-md-12">
              <hr></hr>

              <input
                type={
                  infoState.newPassword === infoState.recoverPassword &&
                  "submit"
                }
                className="btn btn-success btn-send  pt-2 btn-block
          "
                defaultValue="Send Message"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Profile;
