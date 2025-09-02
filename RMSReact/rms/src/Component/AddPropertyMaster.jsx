import React, { useState } from "react";
import axios from "axios";

function AddPropertyMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const [formdata, setformData] = useState({
    pincode: "",
    address2: "",
    city: "",
    address1: "",
    state: "",
    ownerMasters: ownerId,
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
        // "https://rsmapi.vercel.app/propertymaster",
        "http://localhost:5000/propertymaster",
        formdata,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      setMessage({
        ...message,
        danger: "Error, While saving Property",
      });
    } finally {
      setformData({
        pincode: "",
        address2: "",
        city: "",
        address1: "",
        state: "",
        ownerMasters: ownerId,
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
      <form onSubmit={handleSubmit} data-toggle="validator">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Pincode"
                data-errors="Please Enter Pincode."
                name="pincode"
                value={formdata.pincode}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address1 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address1"
                data-errors="Please Enter Address1."
                name="address1"
                value={formdata.address1}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address2 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address2"
                data-errors="Please Enter Address2."
                name="address2"
                value={formdata.address2}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                data-errors="Please Enter City."
                name="city"
                value={formdata.city}
                onChange={handleData}
                required
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
                data-errors="Please Enter State."
                name="state"
                value={formdata.state}
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
        <div class="alert alert-success mt-3" role="alert">
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

export default AddPropertyMaster;
