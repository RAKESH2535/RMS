import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPropertyMaster,
  fetchRentMaster,
  fetchClientMaster,
  fetchOwnerMaster,
  fetchrentTranscation
} from "../Redux/Slice/userSlice";

function Sidebar() {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch()
  useEffect(()=>{
    if(role === 'SuperAdmin'){
      dispatch(fetchOwnerMaster())
  }
  else if(role === 'OwnerMaster')
  {
    dispatch(fetchRentMaster())
    dispatch(fetchClientMaster())
    dispatch(fetchPropertyMaster())
  }
  else{
    dispatch(fetchClientMaster())
    dispatch(fetchrentTranscation())
  }
},[dispatch])
  return (
    <div className="iq-sidebar  sidebar-default ">
      <div className="iq-sidebar-logo d-flex align-items-center justify-content-between">
        <Link to="/dashboard" className="svg-icon">
          <h6 className="logo-title light-logo ml-3">Rent Management System</h6>
        </Link>
        <div className="iq-menu-bt-sidebar ml-0">
          <i className="las la-bars wrapper-menu"></i>
        </div>
      </div>
      <div
        className="data-scrollbar"
        data-scroll="1"
        data-scrollbar="true"
        tabindex="-1"
      >
        <div className="scroll-content">
          <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
              <li className="active">
                <Link to="/dashboard" className="svg-icon">
                  <svg
                    className="svg-icon"
                    id="p-dash1"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span className="ml-4">Dashboards</span>
                </Link>
              </li>
              {role === "SuperAdmin" ? (
                <li className=" ">
                  <a
                    href="#ownermaster"
                    className="collapsed"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <svg
                      className="svg-icon"
                      id="p-dash2"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="ml-4">Owners</span>
                    <svg
                      className="svg-icon iq-arrow-right arrow-active"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="10 15 15 20 20 15"></polyline>
                      <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                    </svg>
                  </a>
                  <ul
                    id="ownermaster"
                    className="iq-submenu collapse"
                    data-parent="#iq-sidebar-toggle"
                  >
                    <li className="">
                      <a>
                        <i className="las la-minus"></i>
                        <Link to="listownermaster">Owners List</Link>
                      </a>
                    </li>
                  </ul>
                </li>
              ) : role === "Owner" ? (
                <>
                  <li className=" ">
                    <a
                      href="#propertymaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">Properties</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="propertymaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a>
                          <i className="las la-minus"></i>
                          <Link to="listpropertymaster">Properties List</Link>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className=" ">
                    <a
                      href="#rentmaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">Property Rents</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="rentmaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a href="../backend/page-list-product.html">
                          <i className="las la-minus"></i>
                          <Link to="listrentmaster">Property Rents List</Link>
                        </a>
                      </li>
                      <li className="">
                        <a href="../backend/page-add-product.html">
                          <i className="las la-minus"></i>
                          <Link to="addrentmaster">Add Rents</Link>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className=" ">
                    <a
                      href="#clientmaster"
                      className="collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <svg
                        className="svg-icon"
                        id="p-dash2"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="ml-4">Clients</span>
                      <svg
                        className="svg-icon iq-arrow-right arrow-active"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="10 15 15 20 20 15"></polyline>
                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                      </svg>
                    </a>
                    <ul
                      id="clientmaster"
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      <li className="">
                        <a>
                          <i className="las la-minus"></i>
                          <Link to="listclientmaster">Clients List</Link>
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className=" ">
                  <a
                    href="#rentrecipt"
                    className="collapsed"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <svg
                      className="svg-icon"
                      id="p-dash2"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="ml-4">RentRecipt</span>
                    <svg
                      className="svg-icon iq-arrow-right arrow-active"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="10 15 15 20 20 15"></polyline>
                      <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                    </svg>
                  </a>
                  <ul
                    id="rentrecipt"
                    className="iq-submenu collapse"
                    data-parent="#iq-sidebar-toggle"
                  >
                    <li className="">
                      <a>
                        <i className="las la-minus"></i>
                        <Link to="listrentrecipt">List RentRecipt</Link>
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
