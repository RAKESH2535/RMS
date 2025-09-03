import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOwnerMaster,
  selectAllOwnerMaster,
} from "../Redux/Slice/userSlice";

function ListOwnerMaster() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchOwnerMaster());
  }, [dispatch]);

  const ownerMaster = useSelector(selectAllOwnerMaster);

  useEffect(() => {
    if (ownerMaster.length === 0) {
      setMessage((prev) => ({
        ...prev,
        danger: `Network error, while retrieving Owner`,
      }));

      setTimeout(() => {
        setMessage({ success: "", danger: "" });
      }, 2000);
    } else {
      setData(ownerMaster);
    }
  }, [ownerMaster]);

  const handleUpdate = (id) => {
    navigate(`/dashboard/ownermaster/update?Id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/ownermaster/${id}`,
        // `https://rsmapi.vercel.app/ownermaster/${id}`,
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
            <th>Email Address</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link>{item.name}</Link>
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.createdAt.slice(0, 10)}</td>
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

export default ListOwnerMaster;
