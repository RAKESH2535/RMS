import React, { useEffect, useMemo, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchClientMaster, selectAllClientMaster } from "../Redux/Slice/userSlice";

function ListClientMaster() {
  const ownerId = localStorage.getItem("ownerId");

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchClientMaster())
  },[])

  const clientmaster = useSelector(selectAllClientMaster);

  useEffect(() => {
    if (clientmaster.length === 0) {
      setMessage({
        ...message,
        danger: `Network error, while retriving Client`,
      });

      setTimeout(
        () =>
          setMessage({
            success: "",
            danger: "",
          }),
        2000
      );
    }
    else {
      setData(clientmaster.filter((item) => item.ownerMasters._id === ownerId))
    }
  }, [clientmaster])

  const handleUpdate = (id) => {
    navigate(`/dashboard/clientmaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        // `https://rsmapi.vercel.app/clientmaster/${id}`,
        `http://localhost:5000/clientmaster/${id}`,
         {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(data.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>Name</th>
            <th>Father Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address1</th>
            <th>Address2</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/dashboard/clientmaster/detail?Id=${item._id}`}>
                    {item.name}
                  </Link>
                </td>
                <td>{item.fatherName}</td>
                <td>{item.gender}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.address1}</td>
                <td>{item.address2}</td>
                <td>{item.ownerMasters.name}</td>
                <td>
                  <div className="d-flex align-items-center list-action">
                    <button
                      className="badge bg-success mr-2"
                      onClick={() => handleUpdate(item._id)}
                    >
                      <ModeOutlinedIcon />
                    </button>
                    <button
                      className="badge bg-warning mr-2"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {message.success && (
        <div className="alert alert-success" role="alert">
          {message.success}
        </div>
      )}
      {message.danger && (
        <div className="alert alert-danger mt-3">{message.danger}</div>
      )}
    </>
  );
}

export default ListClientMaster;
