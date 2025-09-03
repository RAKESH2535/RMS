import React, { useState, useEffect } from "react";
import axios from "axios";

function AddOwnerMaster() {
  const userId = localStorage.getItem("userId");

  const [formdata, setformData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    createdBy: userId,
  });

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  const handleData = (e) => {
    e.preventDefault();

    setformData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/ownermaster",
        // "https://rsmapi.vercel.app/ownermaster",
        formdata,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          timeout: 10000,
        }
      );

      setformData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}, While saving OwnerMaster`,
      });

      setformData({
        name: "",
        email: "",
        password: "",
        phone: "",
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
      <form onSubmit={handleSubmit} data-toggle="validator">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                data-errors="Please Enter Name."
                value={formdata.name}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                data-errors="Please Enter Email."
                name="email"
                value={formdata.email}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Pssword *</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                data-errors="Please Enter Password."
                name="password"
                value={formdata.password}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                data-errors="Please Enter Phone."
                name="phone"
                value={formdata.phone}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
        <button type="reset" className="btn btn-danger">
          Reset
        </button>
      </form>
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

export default AddOwnerMaster;
