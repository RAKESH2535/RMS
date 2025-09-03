import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRentMaster, selectAllRentMaster } from "../Redux/Slice/userSlice";
import "../../src/assets/css/invoice.css"

function RentTransaction() {
  const ownerId = localStorage.getItem("ownerId");
  const url = new URLSearchParams(window.location.search);

  const id = url.get("Id");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rentMasters = useSelector(selectAllRentMaster).filter(
    (item) => item?.propertymaster._id === id
  );
  // console.log(rentMasters);

  const { whichroute } = useParams();

  const now = new Date();

  const date = new Date(now.getFullYear(), now.getMonth(), 1);

  date.setDate(date.getDate() + 5);
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 2).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");
  var newClosingDate = rentMasters[0]?.paymentDate ||
    (yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0]));

  const [formData, setFormData] = useState({
    RentFrom: "",
    RentTo: "",
    paymentThreshold: "",
    paymentMode: "",
    propertyMaster: "",
    rentMaster: "",
    clientMaster: '',
    ownerMasters: ownerId,
  });

  const [data, setData] = useState([]);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchRentMaster());
    setFormData({
      ...rentMasters[0],
      RentFrom: new Date(now.getFullYear(), now.getMonth(), 1)
        .toLocaleDateString("en-GB")
        .replaceAll("/", "-")
        .split("-")
        .reverse()
        .join("-"),
      RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toLocaleDateString("en-GB")
        .replaceAll("/", "-")
        .split("-")
        .reverse()
        .join("-"),
      paymentThreshold: newClosingDate,
      clientMaster: rentMasters[0]?.clientMaster._id,
      rentMaster: rentMasters[0]._id,
      propertyMaster: rentMasters[0]?.propertymaster._id,
    });
  }, []);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/${whichroute}/${id}`,
          // `https://rsmapi.vercel.app/${whichroute}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          setData(await response.data);

          setFormData({
            ...formData,
            rentMaster: response.data._id,
            propertyMaster: response.data.propertymaster._id,
          });
        }
        console.log("formData  ", formData);
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving RentMaster`,
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
    getData();
  }, [id, whichroute]);

  const handleData = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData ", formData);
      const res = await axios.post(
        "http://localhost:5000/rentTranscation",
        // "https://rsmapi.vercel.app/rentTranscation",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage({
        ...message,
        success: res.data.message,
      });
    } catch (error) {
      console.log(error);
      setMessage({
        ...message,
        danger: `${error.message}, While saving RentRecipt`,
      });
    } finally {
      setFormData({
        RentFrom: new Date(now.getFullYear(), now.getMonth(), 1)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        RentTo: new Date(now.getFullYear(), now.getMonth() + 1, 0)
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
        rentMaster: rentMasters[0]._id,
        propertyMaster: rentMasters[0]?.propertymaster._id,
        ownerMasters: ownerId,
        paymentMode: "",
        paymentThreshold: newClosingDate,
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
      <section className="wrapper-invoice">
        <div className="invoice">
          <div className="invoice-information">
            <p>
              <b>Monthly Rent</b> :{" "}
              {formData?.monthlyRent && formData?.monthlyRent?.$numberDecimal}
            </p>

            <p>
              <b>Owner </b> :{" "}
              {formData?.ownerMasters && formData?.ownerMasters.name}
            </p>
          </div>

          <div className="invoice-logo-brand">
            <img src="./assets/image/tampsh.png" alt="" />
          </div>

          <div className="invoice-head">
            <div className="head client-info">
              <p><b>Pincode</b> </p>
              <p>
                {formData?.propertymaster &&
                  formData?.propertymaster.pincode.$numberDecimal}
              </p>
              <p><b>Address1 </b></p>
              <p>{formData?.propertymaster && formData?.propertymaster.address1}</p>
              <p><b>Address2</b></p>
              <p>{formData?.propertymaster && formData?.propertymaster.address2}</p>
            </div>
            <div className="head client-data">
              <p><b>City</b></p>
              <p>{formData?.propertymaster && formData?.propertymaster.city}</p>
              <p><b>State</b></p>
              <p>{formData?.propertymaster && formData?.propertymaster.state}</p>
            </div>
          </div>
          <div className="invoice-body">
            <form onSubmit={handleSubmit}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Transcation Fields</th>
                    <th>Dates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rent From</td>
                    <td>{formData.RentFrom}</td>
                  </tr>
                  <tr>
                    <td>Rent To</td>
                    <td>{formData.RentTo}</td>
                  </tr>
                  <tr>
                    <td>Payment Threshold</td>
                    <td>{formData.paymentThreshold}</td>
                  </tr>
                  <tr>
                    <td>Payment Mode</td>
                    <td>{formData.paymentMode}</td>
                  </tr>
                </tbody>
                <button type="submit" className="btn btn-primary mr-2 mt-3">
                  Add
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mt-3"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </table>
            </form>
          </div>
        </div>
        {message.success && (
          <div className="alert alert-success mt-3" role="alert">
            {message.success}
          </div>
        )}
        {message.danger && (
          <div className="alert alert-danger mt-3" role="alert">
            {message.danger}
          </div>
        )}
      </section>
    </>
  );
}

export default RentTransaction;
