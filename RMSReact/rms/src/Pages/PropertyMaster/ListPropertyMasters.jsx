import React from "react";
import ListPropertyMaster from "../../Component/ListPropertyMaster";
import { Link } from "react-router-dom";

function ListPropertyMasters() {
  return (
    <>
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <div>
                  <h4 className="mb-3">List of Properties</h4>
                </div>
                <Link
                  className="btn btn-primary add-list"
                  to="/dashboard/addpropertymaster"
                  style={{ color: "white" }}
                >
                  {" "}
                  <i className="las la-plus mr-3"></i>Add Properties
                </Link>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="table-responsive rounded mb-3">
                <div className="container">
                  <div className="row">
                    <div className="col-12 d-flex">
                      <label>
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder=""
                          aria-controls="DataTables_Table_0"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              <ListPropertyMaster/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListPropertyMasters;
