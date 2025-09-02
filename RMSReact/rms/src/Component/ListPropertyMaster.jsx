import React, { useEffect, useState } from "react";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPropertyMaster, fetchPropertyMaster,
  deleteMaster,
  fetchRentMaster,
  selectAllRentMaster,
  fetchClientMaster,
} from "../Redux/Slice/userSlice";

function ListPropertyMaster() {

  const [data, setData] = useState([])

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    success: "",
    danger: "",
  });

  useEffect(() => {
    dispatch(fetchRentMaster())
    dispatch(fetchClientMaster())
    dispatch(fetchPropertyMaster())
  }, [dispatch])

  const propertyMaster = useSelector(selectAllPropertyMaster);
  const rentmaster = useSelector(selectAllRentMaster)

  useEffect(() => {
    if (propertyMaster.length === 0) {
      setMessage({
        ...message,
        danger: `Network error, while retriving Property`,
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
      setData(propertyMaster)
    }
  }, [])

  const handleUpdate = (id) => {
    navigate(`/dashboard/propertymaster/update?Id=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteMaster(id));
    } catch (error) {
      setMessage({
        ...message,
        danger: `${error.message}`,
      });
    }
  };

  return (
    <>
      <table className="data-table table mb-0 tbl-server-info">
        <thead className="bg-white text-uppercase">
          <tr className="ligth ligth-data">
            <th>Address1</th>
            <th>Address2</th>
            <th>Pincode</th>
            <th>City</th>
            <th>State</th>
            <th>Property Created at</th>
          </tr>
        </thead>
        <tbody className="ligth-body">
          {data &&
            data.map((item, index) => {

              const rentItem = rentmaster.find(subItem => item._id === subItem?.propertymaster._id);

              return (
                <tr key={index}>
                  <td>
                    {item.address1}
                  </td>
                  <td>{item.address2}</td>
                  <td>{item.pincode && item.pincode.$numberDecimal}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.ownerMasters && item.ownerMasters.name}</td>
                  <td>
                    <div className="d-flex align-items-center list-action">
                      {rentItem ? (
                        <>
                          <Link
                            to={`/dashboard/propertymaster/detail?Id=${item._id}`}
                            className="badge bg-danger mr-2"
                          >
                            Created
                          </Link>
                          <Button
                            variant="contained"
                            className="mr-2"
                            color="success"
                            onClick={() =>
                              navigate(
                                `/dashboard/rentmaster/transcation?Id=${item._id}`
                              )
                            }
                            style={{ textTransform: "none" }}
                            size="small"
                          >
                            Rent Reciept
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            className="mr-2"
                            color="success"
                            size="small"
                            textTransform
                            onClick={() => navigate(`/dashboard/addrentmaster/?Id=${item._id}`)}
                          >
                            Add Rents
                          </Button>
                        </>
                      )}
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
              )

            })
          }
        </tbody>
      </table>
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

export default ListPropertyMaster;
