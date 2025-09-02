import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
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
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        // "https://rsmapi.vercel.app/register",
        "http://localhost:5000/register",

        formdata
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
    <>
      <div class="wrapper">
        <div class="title">Register Form</div>
        <form onSubmit={handleSubmit}>
          <div class="field">
            <input
              type="text"
              name="email"
              required
              value={formdata.email}
              onChange={handleValue}
            />
            <label>Email Address</label>
          </div>
          <div class="field">
            <input
              type="password"
              name="password"
              required
              value={formdata.password}
              onChange={handleValue}
            />

            <label>Password</label>
          </div>
          <div class="content">
            <div class="checkbox">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <div class="pass-link">
              <a>Forgot password?</a>
            </div>
          </div>
          <div class="field">
            <input type="submit" value="Register" />
          </div>
          <div class="signup-link">
            Already a member? <Link to="/">Login</Link>
          </div>
        </form>
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
    </>
  );
}

export default Register;
