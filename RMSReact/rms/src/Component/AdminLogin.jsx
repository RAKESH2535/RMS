import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../Redux/Slice/userSlice";
import signIn from '../assets/images/logo.png'

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [check, setCheck] = useState("Admin");

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const handleValue = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (check === "Admin") {
        const res = await axios.post(
          // "https://rsmapi.vercel.app/login",
          "http://localhost:5000/login",
          formData
        );

        setFormData({
          email: "",
          password: "",
        });

        if (res.data.user) {
          if (res.data.user.role === "SuperAdmin") {
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("token", res.data.token);

            dispatch(
              setAuthenticated({
                userId: res.data.user._id,
                isAuthenticated: !!res.data.token,
              })
            );

            setMessage({
              ...message,
              success: res.data.message,
            });

            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        }
      } else if (check === "Owner") {
        const res = await axios.post(
          // "https://rsmapi.vercel.app/ownermasterlogin",
          "http://localhost:5000/ownermasterlogin",
          formData
        );

        setFormData({
          email: "",
          password: "",
        });

        if (res.data.ownerMaster) {
          if (res.data.ownerMaster.role === "Owner") {
            localStorage.setItem("ownerId", res.data.ownerMaster._id);
            localStorage.setItem("role", res.data.ownerMaster.role);
            localStorage.setItem("token", res.data.token);

            dispatch(
              setAuthenticated({
                ownerId: res.data.ownerMaster._id,
                isAuthenticated: !!res.data.token,
              })
            );

            setMessage({
              ...message,
              success: res.data.message,
            });

            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        }
      }
      else if (check === "Client") {
        const res = await axios.post(
          // "https://rsmapi.vercel.app/clientmasterlogin",
          "http://localhost:5000/clientmasterlogin",
          formData
        );

        setFormData({
          email: "",
          password: "",
        });

        if (res.data.clientMaster) {
          if (res.data.clientMaster.role === "ClientMaster") {
            localStorage.setItem("clientId", res.data.clientMaster._id);
            localStorage.setItem("role", res.data.clientMaster.role);
            localStorage.setItem("token", res.data.token);

            dispatch(
              setAuthenticated({
                clientId: res.data.clientMaster._id,
                isAuthenticated: !!res.data.token,
              })
            );

            setMessage({
              ...message,
              success: res.data.message,
            });

            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        }
      }
    } catch (error) {
      setMessage({
        ...message,
        danger: error.message,
      });

      setFormData({
        email: "",
        password: "",
      });
    } finally {
      setTimeout(
        () =>
          setMessage({
            success: "",
            danger: "",
          }),
        3000
      );
    }
  };

  return (
    <>
      <section className="login-content">
        <div className="container">
          <div className="row align-items-center justify-content-center height-self-center">
            <div className="col-lg-8">
              <div class="radio-container">
                <input
                  type="radio"
                  value="SuperAdmin"
                  checked={check === "Admin"}
                  onChange={() => setCheck("Admin")}
                  style={{ margin: "5px" }}
                />{" "}
                Admin &nbsp;
                <input
                  type="radio"
                  value="OwnerMaster"
                  checked={check === "Owner"}
                  onChange={() => setCheck("Owner")}
                />{" "}
                Owner &nbsp;
                <input
                  type="radio"
                  value="ClientMaster"
                  checked={check === "Client"}
                  onChange={() => setCheck("Client")}
                />{" "}
                Client
              </div>
              <div className="card auth-card">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center auth-content">
                    <div className="col-lg-7 align-self-center">
                      <div className="p-3">
                        <h2 className="mb-2">Sign In</h2>
                        <p>Login to stay connected.</p>
                        {
                          check === 'Admin' ? (
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Email</label>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Password</label>
                                  </div>
                                </div>
                                <div className="col-lg-6 justify-content-end">
                                  <Link to="/forgotPassword">Forgot Password?</Link>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Sign In
                              </button>
                              <p className="mt-3">
                                Create an Account{" "}
                                <Link className="text-primary" to="/register">
                                  Sign Up
                                </Link>
                              </p>
                            </form>
                          ) : check === 'Owner' ? (
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Email</label>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Password</label>
                                  </div>
                                </div>
                                <div className="col-lg-6 justify-content-end">
                                  <Link to="/forgotPassword">Forgot Password?</Link>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Sign In
                              </button>
                              <p className="mt-3">
                                Create an Account{" "}
                                <Link className="text-primary" to="/register">
                                  Sign Up
                                </Link>
                              </p>
                            </form>
                          ) : (
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Email</label>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="floating-label form-group">
                                    <input
                                      className="floating-input form-control"
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleValue}
                                      required
                                    />
                                    <label>Password</label>
                                  </div>
                                </div>
                                <div className="col-lg-6 justify-content-end">
                                  <Link to="/forgotPassword">Forgot Password?</Link>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Sign In
                              </button>
                              <p className="mt-3">
                                Create an Account{" "}
                                <Link className="text-primary" to="/register">
                                  Sign Up
                                </Link>
                              </p>
                            </form>
                          )
                        }
                      </div>
                    </div>
                    <div className="col-lg-5 content-right">
                      <img
                        src={signIn}
                        className="img-fluid image-right"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              {message.success && (
                  <div class="alert alert-success mt-3" role="alert">
                    {message.success}
                  </div>
                )}
                {message.danger && (
                  <div class="alert alert-danger mt-3" role="alert">
                    {message.danger}
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminLogin;
