import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchrentTranscation,
    selectAllClientMaster,
    selectAllPropertyMaster,
    selectAllRentMaster,
    selectAllRentTranscation,
} from "../Redux/Slice/userSlice";

function Detail() {
    const [data, setData] = useState([]);

    const url = new URLSearchParams(window.location.search);

    const { whichroute } = useParams();

    const id = url.get("Id");

    const dispatch = useDispatch()

    const propertyMaster = useSelector(selectAllPropertyMaster).filter(
        (item) => item._id === id
    );
    const clientMaster = useSelector(selectAllClientMaster).filter(
        (item) => item._id === id
    );
    console.log(clientMaster);

    const rentMaster = useSelector(selectAllRentMaster).filter(
        (item) => item?.propertymaster._id === id
    );

    useEffect(() => {
        dispatch(fetchrentTranscation())
    }, [whichroute === 'rentTranscation'])
    const transcation = useSelector(selectAllRentTranscation).filter(item => item._id === id)

    const navigate = useNavigate();

    const [message, setMessage] = useState({
        success: "",
        danger: "",
    });

    useEffect(() => {
        const getData = async () => {
            // try {
            //     const res = await axios.get(`https://rsmapi.vercel.app/${whichroute}/${id}`, {
            //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            //     })
            //     setData(await res.data)
            // } catch (error) {
            //     setMessage({
            //         ...message,
            //         danger: `${error.message}, While retriving Data`,
            //     });
            // } finally {
            //     setTimeout(
            //         () =>
            //             setMessage({
            //                 success: "",
            //                 danger: "",
            //             }),
            //         3000
            //     );
            // }

            if (whichroute === "propertymaster") {
                setData(rentMaster[0]);
            } else if (whichroute === "clientmaster") {
                setData(clientMaster[0]);
            } else if (whichroute === "rentmaster") {
                setData(rentMaster[0]);
            }
            else if (whichroute === 'rentTranscation') {
                setData(transcation[0])
            }
        };

        getData();
    }, [id]);

    return (
        <>
            <div className="content-page">
                <div className="container-fluid add-form-list">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">
                                            {whichroute.charAt(0).toUpperCase() + whichroute.slice(1)}
                                            Detail
                                        </h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {whichroute === "propertymaster"
                                            ? (data &&
                                                Object.keys(data).map(
                                                    (item, index) =>
                                                        (item === 'incrementPercentage' || item === 'incrementSchedule' || item === 'monthlyRent' || item === 'securityDepositAmount') ? (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        Property_Rent {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                    </h5>
                                                                    <div className="help-block">{data[item] && data[item].$numberDecimal}</div>
                                                                </div>
                                                            </div>
                                                        ) : (item === 'createdAt' || item === 'updatedAt') ? (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        Property_Rent {item.charAt(0).toUpperCase() + item.slice(1, 7)}Date
                                                                    </h5>
                                                                    <div className="help-block">{data[item] && data[item].slice(0, 10)}</div>
                                                                </div>
                                                            </div>
                                                        ) : item === 'electricityMeterNumber' ? (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        Property_Rent {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                    </h5>
                                                                    <div className="help-block">{data[item].slice(0, 10)}</div>
                                                                </div>
                                                            </div>
                                                        ) :
                                                            item === "propertymaster" ? (
                                                                <>
                                                                    <div className="col-md-12 mb-3">
                                                                        <div className="form-group">
                                                                            <h4>Property Detail</h4>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        (Object.keys(data[item]).map((subtItem, subIndex) =>
                                                                            (subtItem !== "__v" &&
                                                                                subtItem !== "ownerMasters" &&
                                                                                subtItem !== "pincode" && subtItem !== "createdAt" &&
                                                                                subtItem !== "updatedAt" && subtItem!=='_id') ? (
                                                                                <div className="col-md-6" key={subIndex}>
                                                                                    <div className="form-group">
                                                                                        <h5>
                                                                                            {subtItem.charAt(0).toUpperCase() +
                                                                                                subtItem.slice(1)}
                                                                                        </h5>
                                                                                        <div className="help-block">
                                                                                            {data[item][subtItem]}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : subtItem !== "__v" &&
                                                                                subtItem !== "ownerMasters" &&subtItem!=='_id'&&
                                                                                subtItem === "pincode" ? (
                                                                                <div className="col-md-6" key={subIndex}>
                                                                                    <div className="form-group">
                                                                                        <h5>
                                                                                            {subtItem.charAt(0).toUpperCase() +
                                                                                                subtItem.slice(1)}
                                                                                        </h5>
                                                                                        <div className="help-block">
                                                                                            {data[item][subtItem] && data[item][subtItem].$numberDecimal}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : ((subtItem !== "ownerMasters") &&
                                                                                (subtItem === "createdAt" ||
                                                                                    subtItem === "updatedAt")) ? (
                                                                                item !== "__v" && (
                                                                                    <div className="col-md-6" key={subIndex}>
                                                                                        <div className="form-group">
                                                                                            <h5>
                                                                                                {subtItem.charAt(0).toUpperCase() +
                                                                                                    subtItem.slice(1, 7)}Date
                                                                                            </h5>
                                                                                            <div className="help-block">
                                                                                                {data[item][subtItem] && data[item][subtItem].slice(0, 10)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            ) : (null
                                                                            )
                                                                        ))
                                                                    }
                                                                </>
                                                            ) : item === 'clientMaster' && (
                                                                <>
                                                                    <div className="col-md-12 mb-3">
                                                                        <div className="form-group">
                                                                            <h4>Client Detail</h4>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        Object.keys(data[item]).map((subItem, subIndex) => (
                                                                            (subItem !== '__v' && subItem !== 'ownerMasters' && subItem !== 'password' && subItem !== 'role' && subItem !== 'createdAt' && subItem !== 'updatedAt' && subItem !== '_id') ? (
                                                                                <div className="col-md-6" key={subIndex}>
                                                                                    <div className="form-group">
                                                                                        <h5>
                                                                                            {subItem.charAt(0).toUpperCase() + subItem.slice(1)}
                                                                                        </h5>
                                                                                        <div className="help-block">{data[item][subItem]}</div>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (subItem === 'createdAt' || subItem === 'updatedAt') && (
                                                                                <div className="col-md-6" key={subIndex}>
                                                                                    <div className="form-group">
                                                                                        <h5>
                                                                                            {subItem.charAt(0).toUpperCase() + subItem.slice(1, 7)}Date
                                                                                        </h5>
                                                                                        <div className="help-block">{data[item][subItem] && data[item][subItem].slice(0, 10)}</div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                )

                                            )
                                            : whichroute === "clientmaster"
                                                ? data &&
                                                Object.keys(data).map((item, index) =>
                                                    item !== "__v" && item !== "ownerMasters" && item !== '_id' && item !== 'password' && item !== "createdAt" && item !== 'updatedAt' ? (
                                                        <div className="col-md-6" key={index}>
                                                            <div className="form-group">
                                                                <h5>
                                                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                </h5>
                                                                <div className="help-block">{data[item]}</div>
                                                            </div>
                                                        </div>
                                                    ) : (item !== "ownerMasters" &&
                                                        item === "createdAt" && item !== '_id' && item !== 'password') ||
                                                        item === "updatedAt" ? (
                                                        item !== "__v" && (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        {item.charAt(0).toUpperCase() +
                                                                            item.slice(1, 7)}Date
                                                                    </h5>
                                                                    <div className="help-block">{data[item] && data[item].slice(0, 10)}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    ) : (
                                                        item === "ownerMasters" && (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        {item.charAt(0).toUpperCase() +
                                                                            item.slice(1, 5)}
                                                                    </h5>
                                                                    <div className="help-block">
                                                                        {data[item].name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                )
                                                : whichroute === "rentmaster"
                                                    ? {
                                                        /* data && Object.keys(data).map((item, index) => (
                                                                                  (item === 'electricityMeterNumber') ? (
                                                                                      <div className="col-md-6" key={index}>
                                                                                          <div className="form-group">
                                                                                              <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                                              <div className="help-block">{data[item]}</div>
                                                                                          </div>
                                                                                      </div>
                                                                                  ) : (
                                                                                      item === 'incrementPercentage' || item === 'securityDepositAmount' || item === 'monthlyRent' || item === 'incrementSchedule' ?
                                                                                          (
                                                                                              (item !== '__v' && item !== 'propertymaster') && (
                                                                                                  <div className="col-md-6" key={index}>
                                                                                                      <div className="form-group">
                                                                                                          <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                                                          <div className="help-block">{data[item].$numberDecimal}</div>
                                                                                                      </div>
                                                                                                  </div>
                                                                                              )
                                                                                          ) : item === 'propertymaster' ? (
                                                                                              <div className="col-md-6" key={index}>
                                                                                                  <div className="form-group">
                                                                                                      <h5>Property</h5>
                                                                                                      <div className="help-block">{data[item].address1},{data[item].address2},{data[item].pincode.$numberDecimal},{data[item].city},{data[item].state}</div>
                                                                                                  </div>
                                                                                              </div>
                                                                                          ) : (item === 'createdAt' || item === 'updatedAt') && (
                                                                                              <div className="col-md-6" key={index}>
                                                                                                  <div className="form-group">
                                                                                                      <h5>{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                                                                                                      <div className="help-block">{data[item].slice(0, 10)}</div>
                                                                                                  </div>
                                                                                              </div>
                                                                                          )
                                                                                  )
                                                                              )) */
                                                    }
                                                    : whichroute === "rentTranscation" &&
                                                    data &&
                                                    Object.keys(data).map((item, index) =>
                                                        item === "clientMaster" ? (
                                                            Object.keys(data[item]).map((subItem, subIndex) => (
                                                                <>
                                                                    {subItem === "createdAt" ||
                                                                        (subItem === "updatedAt" &&
                                                                            subItem !== "__v" &&
                                                                            subItem !== "role" &&
                                                                            subItem !== "_id" &&
                                                                            subItem !== "password") ? (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Client{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {data[item][subItem].slice(0, 10)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        subItem !== "ownerMasters" &&
                                                                        subItem !== "__v" &&
                                                                        subItem !== "role" &&
                                                                        subItem !== "_id" &&
                                                                        subItem !== "password" && (
                                                                            <div className="col-md-6" key={subIndex}>
                                                                                <div className="form-group">
                                                                                    <h5>
                                                                                        Client{" "}
                                                                                        {subItem.charAt(0).toUpperCase() +
                                                                                            subItem.slice(1)}
                                                                                    </h5>
                                                                                    <div className="help-block">
                                                                                        {data[item][subItem]}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </>
                                                            ))
                                                        ) : item === "propertyMaster" ? (
                                                            Object.keys(data[item]).map((subItem, subIndex) => (
                                                                <>
                                                                    {subItem === "pincode" &&
                                                                        subItem !== "__v" &&
                                                                        subItem !== "_id" ? (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Property{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {" "}
                                                                                    {data[item][subItem].$numberDecimal}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : subItem === "createdAt" ||
                                                                        subItem === "updatedAt" ? (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Property{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {data[item][subItem].slice(0, 10)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        subItem !== "ownerMasters" &&
                                                                        subItem !== "__v" &&
                                                                        subItem !== "_id" && (
                                                                            <div className="col-md-6" key={subIndex}>
                                                                                <div className="form-group">
                                                                                    <h5>
                                                                                        Property{" "}
                                                                                        {subItem.charAt(0).toUpperCase() +
                                                                                            subItem.slice(1)}
                                                                                    </h5>
                                                                                    <div className="help-block">
                                                                                        {data[item][subItem]}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </>
                                                            ))
                                                        ) : item === "rentMaster" ? (
                                                            Object.keys(data[item]).map((subItem, subIndex) => (
                                                                <>
                                                                    {(subItem === "incrementPercentage" ||
                                                                        subItem === "securityDepositAmount" ||
                                                                        subItem === "monthlyRent" ||
                                                                        subItem === "incrementSchedule") &&
                                                                        subItem !== "propertymaster" &&
                                                                        subItem !== "ownerMasters" &&
                                                                        subItem !== "clientMaster" &&
                                                                        subItem !== "__v" ? (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Rent{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {" "}
                                                                                    {data[item][subItem].$numberDecimal}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : subItem === "createdAt" ||
                                                                        (subItem === "updatedAt" &&
                                                                            subItem !== "ownerMasters" &&
                                                                            subItem !== "propertymaster" &&
                                                                            subItem !== "clientMaster" &&
                                                                            subItem !== "__v" &&
                                                                            subItem !== "_id") ? (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Rent{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {" "}
                                                                                    {data[item][subItem].slice(0, 10)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        subItem !== "ownerMasters" &&
                                                                        subItem !== "propertymaster" &&
                                                                        subItem !== "clientMaster" &&
                                                                        subItem !== "__v" &&
                                                                        subItem !== "_id" && (
                                                                            <div className="col-md-6" key={subIndex}>
                                                                                <div className="form-group">
                                                                                    <h5>
                                                                                        Rent{" "}
                                                                                        {subItem.charAt(0).toUpperCase() +
                                                                                            subItem.slice(1)}
                                                                                    </h5>
                                                                                    <div className="help-block">
                                                                                        {data[item][subItem]}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </>
                                                            ))
                                                        ) : item === "ownerMasters" ? (
                                                            Object.keys(data[item]).map(
                                                                (subItem, subIndex) =>
                                                                    (subItem === "name" ||
                                                                        subItem === "phone" ||
                                                                        subItem === "email") && (
                                                                        <div className="col-md-6" key={subIndex}>
                                                                            <div className="form-group">
                                                                                <h5>
                                                                                    Owner{" "}
                                                                                    {subItem.charAt(0).toUpperCase() +
                                                                                        subItem.slice(1)}
                                                                                </h5>
                                                                                <div className="help-block">
                                                                                    {" "}
                                                                                    {data[item][subItem]}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            )
                                                        ) : item === "RentFrom" ||
                                                            item === "RentTo" ||
                                                            item === "paymentThreshold" ? (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-group">
                                                                    <h5>
                                                                        {" "}
                                                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                    </h5>
                                                                    <div className="help-block">
                                                                        {data[item].slice(0, 10)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            item !== "__v" && (
                                                                <div className="col-md-6" key={index}>
                                                                    <div className="form-group">
                                                                        <h5>
                                                                            {" "}
                                                                            {item.charAt(0).toUpperCase() +
                                                                                item.slice(1)}
                                                                        </h5>
                                                                        <div className="help-block">
                                                                            {" "}
                                                                            {data[item]}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    )}
                                    </div >
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {message.danger && (
                    <div className="alert alert-danger mt-3">{message.danger}</div>
                )}
            </div>
        </>
    );
}

export default Detail;
