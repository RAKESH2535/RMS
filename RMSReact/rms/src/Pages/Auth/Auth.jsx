import React,{ useState } from "react";
import AdminLogin from "../../Component/AdminLogin";
import Login from "../../Component/Login";

function Auth() {
  const [check, setCheck] = useState("SuperAdmin");

  return (
    <>
      <input
        type="radio"
        value="SuperAdmin"
        checked={check === "SuperAdmin"}
        onChange={() => setCheck("SuperAdmin")}
        style={{ margin: "5px" }}
      /> SuperAdmin &nbsp;
      <input
        type="radio"
        value="OwnerMaster"
        checked={check === "OwnerMaster"}
        onChange={() => setCheck("OwnerMaster")}
      />
      OwnerMaster

      {
        check === 'SuperAdmin' && <AdminLogin />
      }
      {
        check === 'Owner' && <Login/>
      }
      
    </>
  );
}

export default Auth;
