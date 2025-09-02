import React, { useState, useEffect, useId } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPropertyMaster, fetchClientMaster,
  selectAllClientMaster,
} from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
function AddRentMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const [formdata, setformData] = useState({
    electricityMeterNumber: "",
    clientMaster: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    paymentDate:'',
    paymentMode:'',
    incrementSchedule: "",
    propertymaster: "",
    ownerMasters: ownerId,
  });
  const url = new URLSearchParams(window.location.search);
  const id = url.get("Id");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const propertymaster = useSelector(selectAllPropertyMaster);

  useEffect(() => {
    dispatch(fetchClientMaster())
  }, [])

  const clientMaster = useSelector(selectAllClientMaster);

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
    console.log("formda ", formdata);

    try {
      const res = await axios.post(
        // "https://rsmapi.vercel.app/rentmaster",
        "http://localhost:5000/rentmaster",
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
        danger: `${error.message}, While saving RentMaster`,
      });
    } finally {
      setformData({
        electricityMeterNumber: "",
        clientMaster: "",
        incrementPercentage: "",
        securityDepositAmount: "",
        monthlyRent: "",
        incrementSchedule: "",
        propertymaster: "",
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
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Electricity Meter Number *</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter Electricity Meter Number"
                name="electricityMeterNumber"
                value={formdata.electricityMeterNumber}
                onChange={handleData}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Select Client *</label>
              <select
                className="form-control"
                name="clientMaster"
                value={formdata.clientMaster}
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {clientMaster.map((item, index) => (
                  <option value={item._id} key={index} required>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Percentage *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Percentage"
                name="incrementPercentage"
                value={formdata.incrementPercentage}
                onChange={handleData}
                required
                min="1"
                max="3"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Security Deposit Amount *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Security Deposit Amount"
                name="securityDepositAmount"
                value={formdata.securityDepositAmount}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Monthly Rent *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Monthly Rent"
                name="monthlyRent"
                value={formdata.monthlyRent}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Increment Schedule *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Increment Schedule"
                name="incrementSchedule"
                value={formdata.incrementSchedule}
                onChange={handleData}
                required
                min="1"
                max="10"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentDate (No of Days) *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter No of Days"
                name="paymentDate"
                value={formdata.paymentDate}
                onChange={handleData}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Select your property *</label>
              <select
                className="form-control"
                name="propertymaster"
                value={
                  id ? (formdata.propertymaster = id) : formdata.propertymaster
                }
                onChange={handleData}
                required
              >
                <option value="">Select</option>
                {propertymaster &&
                  propertymaster.map((item, index) =>
                    item._id === id ? (
                      <option
                        key={index}
                        value={item._id}
                        selected="true"
                        disabled
                      >
                        {item.pincode.$numberDecimal} - {item.address2} - {item.address1} - {item.city}
                      </option>
                    ) : (
                      <>
                        <option key={index} value={item._id}>
                          {item.pincode.$numberDecimal} - {item.address2} - {item.address1} - {item.city}
                        </option> 
                      </>
                    )
                  )}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>PaymentMode *</label>
              <select className="form-control" name="paymentMode" value={formdata.paymentMode} onChange={handleData} required>
                <option value="">Select</option>
                <option value='cash'>Cash</option>
                <option value='Online_Payment'>Online Payment</option>
                <option value='Any'>Any</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add
        </button>
        <button
          className="btn btn-danger mr-2"
          onClick={() => navigate(-1)}
        >
          Back
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

export default AddRentMaster;
