import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientMaster, fetchrentTranscation, selectAllClientMaster, selectAllRentTranscation } from "../Redux/Slice/userSlice";

function ListRentRecipt() {
  const clientId = localStorage.getItem("clientId");

  const [rentRecipts, setRentRecipts] = useState([]);

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchClientMaster())
    dispatch(fetchrentTranscation())
  }, [dispatch])

  const clientData = useSelector(selectAllClientMaster)
  const transcation = useSelector(selectAllRentTranscation).filter(item => item.clientMaster._id === clientId)

  useEffect(() => {
      if (transcation.length === 0) {
        setMessage({
          ...message,
          danger: `Network Error`,
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
      else {
        setRentRecipts(transcation)
      }
  }, [])
  
  console.log("clientData ", clientData );

  console.log("recipts ", rentRecipts);

  console.log("transcation ", transcation);


  useEffect(() => {

    const getData = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/rentTranscation",
          // "https://rsmapi.vercel.app/rentTranscation",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setRentRecipts(
            await res.data.filter(item => item.clientMaster._id === clientId)
          );
          if (rentRecipts.length === 0) {
            setMessage({
              ...message,
              success: `No Data Found`,
            });
          }

        }
      } catch (error) {
        setMessage({
          ...message,
          danger: `${error.message}, While retriving RentRecipt`,
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
  }, []);

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>ClientName</th>
            <th>ClientEmail</th>
            <th>RentFrom</th>
            <th>RentTo</th>
            <th>PaymentThreshold</th>
            <th>PaymentMode</th>
            <th>MonthlyRent</th>
            <th>PropertyDetail</th>
            <th>OwnerDetail</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {rentRecipts &&
            rentRecipts.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/rentTranscation/detail?Id=${item._id}`}>
                    {item?.clientMaster.name}
                  </Link>
                </td>
                <td>{item?.clientMaster.email}</td>
                <td>{item.RentFrom && item.RentFrom.slice(0, 10)}</td>
                <td>{item.RentTo && item.RentTo.slice(0, 10)}</td>
                <td>{item.paymentThreshold && item.paymentThreshold.slice(0, 10)}</td>
                <td>{item.paymentMode === 'cash' ?  item.paymentMode: <Link to=''>{item.paymentMode}</Link>}</td>
                <td>{item?.rentMaster?.monthlyRent?.$numberDecimal}</td>
                <td>
                  {item.propertyMaster &&
                    item?.propertyMaster?.pincode?.$numberDecimal}
                </td>
                <td>{item?.ownerMasters && item?.ownerMasters.name}</td>
                <td>
                  <div className="d-flex align-items-center list-action">
                    {/* <button
                      className="badge bg-warning mr-2"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
export default ListRentRecipt;
