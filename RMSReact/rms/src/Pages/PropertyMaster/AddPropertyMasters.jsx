import React from "react";
import AddPropertyMaster from "../../Component/AddPropertyMaster";

function AddPropertyMasters() {
  return (
    <>
      <div className="content-page">
        <div className="container-fluid add-form-list">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Add Property</h4>
                  </div>
                </div>

                <div className="card-body">
               <AddPropertyMaster/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddPropertyMasters;