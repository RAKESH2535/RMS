import React from "react";
import AddRentMaster from "../../Component/AddRentMaster"

function AddRentMasters() {
  return (
    <>
      <div className="content-page">
        <div className="container-fluid add-form-list">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Add Rent</h4>
                  </div>
                </div>
                <div className="card-body">
                <AddRentMaster/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddRentMasters;
