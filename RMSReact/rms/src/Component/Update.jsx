import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectAllClientMaster, selectAllOwnerMaster, selectAllPropertyMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";
import axios from "axios";

function Update() {
  const url = new URLSearchParams(window.location.search);

  const ownerId = localStorage.getItem("ownerId");

  const { whichroute } = useParams();

  const id = url.get("Id");

  const navigate = useNavigate();

  const ownerMaster = useSelector(selectAllOwnerMaster).filter(item => item._id === id)
  const propertyMaster = useSelector(selectAllPropertyMaster).filter(item => item._id === id);
  const propertyData = useSelector(selectAllPropertyMaster).filter(item=>item.ownerMasters._id === ownerId)
  const rentMaster = useSelector(selectAllRentMaster).filter(item => item._id === id)
  const clientMaster = useSelector(selectAllClientMaster).filter(item => item._id === id)

  const [formData, setFormData] = useState({
    name: "",
    emailaddress: "",
    gender: "Select",
    password: "",
    phone: "",
    mobileNumber: "",
    pincode: "",
    address1: "",
    email: "",
    address2: "",
    fatherName: "",
    city: "",
    state: "",
    electricityMeterNumber: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    incrementSchedule: "",
    propertymaster: "",
    clientMaster: "",
    ownerMasters: ownerId,
  })

  const [data, setData] = useState({
    name: "",
    emailaddress: "",
    gender: "Select",
    password: "",
    phone: "",
    mobileNumber: "",
    pincode: "",
    address1: "",
    email: "",
    address2: "",
    fatherName: "",
    city: "",
    state: "",
    electricityMeterNumber: "",
    incrementPercentage: "",
    securityDepositAmount: "",
    monthlyRent: "",
    incrementSchedule: "",
    propertymaster: "",
    clientMaster: "",
    ownerMasters: ownerId,
  });

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {

    const retriveData = () => {
      if (whichroute === 'propertymaster') {
        setData(propertyMaster[0])
      }
      else if (whichroute === 'rentmaster') {
        setData(rentMaster[0])
        console.log(rentMaster[0]);
        
      }
      else if (whichroute === 'clientmaster') {
        setData(clientMaster[0])
        
      }
      else {
        setData(ownerMaster[0])
      }
    }

    retriveData();
    // const retriveData = async () => {
    //   try {
    //     const res = await axios.get(
    //       `https://rsmapi.vercel.app/${whichroute}/${id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     if (whichroute === 'rentmaster') {
    //       setData((prev) => ({
    //         ...prev, ...res.data,
    //         propertymaster: res.data.propertymaster._id,
    //         clientMaster: res.data.clientMaster._id
    //       }));

    //     }
    //     else {
    //       setData(await res.data)
    //     }

    //     setFormData(await res.data)
    //     console.log("Data ", data);


    //   } catch (error) {
    //     setMessage({
    //       ...message,
    //       danger: `${error.message}`,
    //     });
    //   }
    // };
    // retriveData();
  }, [id]);

  const handleData = (e) => {
    e.preventDefault();

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        // `https://rsmapi.vercel.app/${whichroute}/${id}`,
        `http://localhost:5000/${whichroute}/${id}`,

        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage({
        ...message,
        success: "Update Successfully",
      });
    } catch (error) {
      setMessage({
        ...message,
        success: "Error! while Updating",
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
      <div className="content-page">
        <div className="container-fluid add-form-list">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Update</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit}
                    data-toggle="validator"
                    novalidate="true"
                  >
                    {whichroute === "ownermaster" ? (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Id *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data._id}
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              name="name"
                              data-errors="Please Enter Name."
                              value={data.name}
                              onChange={handleData}
                              required=""
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
                              name="emailaddress"
                              value={data.email}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Password *</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Enter Password"
                              data-errors="Please Enter Password."
                              name="password"
                              value={data.password}
                              onChange={handleData}
                              required=""
                              disabled
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
                              value={data.phone}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    ) : whichroute === "propertymaster" ? (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Id *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data._id}
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Pincode *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Pincode"
                              name="pincode"
                              data-errors="Please Enter Pincode."
                              value={data.pincode.$numberDecimal}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address1 *</label>
                            <input
                              type="address1"
                              className="form-control"
                              placeholder="Enter Address1"
                              data-errors="Please Enter Address1."
                              name="address1"
                              value={data.address1}
                              onChange={handleData}
                              required=""
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
                              value={data.address2}
                              onChange={handleData}
                              required=""
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
                              value={data.city}
                              onChange={handleData}
                              required=""
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
                              placeholder="Enter state"
                              data-errors="Please Enter state."
                              name="state"
                              value={data.state}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>CreatedAt *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                data.createdAt && data.createdAt.slice(0, 10)
                              }
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>CreatedBy *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                data.ownerMasters && data.ownerMasters.name
                              }
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    ) : whichroute === "clientmaster" ? (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Id *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data._id}
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Client Name"
                              name="name"
                              data-errors="Please Enter Client Name."
                              value={data.name}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>FatherName *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter FatherName"
                              data-errors="Please Enter FatherName."
                              name="fatherName"
                              value={data.fatherName}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Email"
                              data-errors="Please Enter Email."
                              name="email"
                              value={data.email}
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Password*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Password"
                              data-errors="Please Enter Password."
                              name="password"
                              value={data.password}
                              onChange={handleData}
                              required=""
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Gender *</label>
                            <select
                              className="form-control"
                              name="gender"
                              value={data.gender}
                              onChange={handleData}
                              required
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
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
                              name="mobileNumber"
                              value={data.mobileNumber}
                              onChange={handleData}
                              required=""
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
                              value={data.address1}
                              onChange={handleData}
                              required=""
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
                              value={data.address2}
                              onChange={handleData}
                              required=""
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>CreatedAt *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.createdAt && data.createdAt.slice(0, 10)}
                              onChange={handleData}
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>CreatedBy *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                data.ownerMasters && data.ownerMasters.name
                              }
                              onChange={handleData}
                              disabled
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      whichroute === "rentmaster" && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Id *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={data._id}
                                onChange={handleData}
                                disabled
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>ElectricityMeterNumber *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter ElectricityMeterNumber"
                                name="electricityMeterNumber"
                                data-errors="Please Enter ElectricityMeterNumber."
                                value={data.electricityMeterNumber}
                                onChange={handleData}
                                required=""
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>IncrementPercentage *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter IncrementPercentage"
                                data-errors="Please Enter IncrementPercentage."
                                name="incrementPercentage"
                                value={
                                  data.incrementPercentage &&
                                  data.incrementPercentage.$numberDecimal
                                }
                                onChange={handleData}
                                required=""
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>SecurityDepositAmount *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter SecurityDepositAmount"
                                data-errors="Please Enter SecurityDepositAmount."
                                name="securityDepositAmount"
                                value={
                                  data.securityDepositAmount &&
                                  data.securityDepositAmount.$numberDecimal
                                }
                                onChange={handleData}
                                required=""
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>MonthlyRent *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter MonthlyRent"
                                data-errors="Please Enter MonthlyRent."
                                name="monthlyRent"
                                value={
                                  data.monthlyRent &&
                                  data.monthlyRent.$numberDecimal
                                }
                                onChange={handleData}
                                required=""
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>IncrementSchedule *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter IncrementSchedule"
                                data-errors="Please Enter IncrementSchedule."
                                name="incrementSchedule"
                                value={
                                  data.incrementSchedule &&
                                  data.incrementSchedule.$numberDecimal
                                }
                                onChange={handleData}
                                required=""
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>ClientName *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={
                                  data.clientMaster && data.clientMaster.name
                                }
                                onChange={handleData}
                                disabled
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Property *</label>
                              <select
                                className="form-control"
                                name="propertymaster"
                                value={data.propertymaster}
                                onChange={handleData}
                                required
                              >
                                <option value="Select">Select</option>
                                {propertyData &&
                                  propertyData.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item._id}
                                      required
                                    >
                                      {item.address1}, {item.address2},
                                      {item.pincode &&
                                        item.pincode.$numberDecimal}
                                      , {item.city}, {item.state}
                                    </option>
                                  ))}
                              </select>
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>CreatedAt *</label>
                              <input
                                type="text"
                                className="form-control"
                                value={
                                  data.createdAt && data.createdAt.slice(0, 10)
                                }
                                onChange={handleData}
                                disabled
                              />
                              <div className="help-block with-errors"></div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <button type="submit" className="btn btn-primary mr-2">
                      Update
                    </button>
                    <button
                      type="reset"
                      className="btn btn-danger"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {message.success && (
          <div className="alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        {message.danger && (
          <div className="alert alert-danger mt-3" role="alert">
            {message.danger}
          </div>
        )}
      </div>
    </>
  );
}

export default Update;
