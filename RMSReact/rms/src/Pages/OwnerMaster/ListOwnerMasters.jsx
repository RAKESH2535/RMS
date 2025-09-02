import React from "react";
import { Link } from "react-router-dom";
import ListOwnerMaster from "../../Component/ListOwnerMaster";

function ListOwnerMasters() {
  const role = localStorage.getItem('role')
  if (role !== 'SuperAdmin') {
    window.location.href = `${window.location.origin}/dashboard`
  }
  return (
    <>
      {role === 'SuperAdmin' && <div class="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                <div>
                  <h4 className="mb-3">List of Owners</h4>
                </div>
                <Link
                  className="btn btn-primary add-list"
                  to="/dashboard/addownermaster"
                  style={{ color: "white" }}
                >
                  {" "}
                  <i className="las la-plus mr-3"></i>Add Owner
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
                <ListOwnerMaster />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
export default ListOwnerMasters;