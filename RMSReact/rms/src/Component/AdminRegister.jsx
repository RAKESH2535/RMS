import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from '../assets/images/login/01.png'
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const res = await axios.post(
        // "https://rsmapi.vercel.app/register",
        "http://localhost:5000/register",
        formData
      );

      setMessage({
        ...message,
        success: res.data.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage({
        ...message,
        danger: "Error, While submitting form",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
      });

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
    <section className="login-content">
      <div className="container">
        <div className="row align-items-center justify-content-center height-self-center">
          <div className="col-lg-8">
            <div className="card auth-card">
              <div className="card-body p-0">
                <div className="d-flex align-items-center auth-content">
                  <div className="col-lg-7 align-self-center">
                    <div className="p-3">
                      <h2 className="mb-2">Sign Up</h2>
                      <p>Create Your Rent Management System.</p>
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
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        <p className="mt-3">
                          Already have an Account{" "}
                          <Link className="text-primary" to="/">
                            Sign In
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5 content-right">
                    <img
                      src={signup}
                      className="img-fluid image-right"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {message.success && (
          <div class="alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        {message.danger && (
          <div class="alert alert-danger mt-3" role="alert">
            {message.danger}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminRegister;
