import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Update from "./Component/Update";
import AddPropertyMasters from "./Pages/PropertyMaster/AddPropertyMasters";
import ListPropertyMasters from "./Pages/PropertyMaster/ListPropertyMasters";
import AddRentMasters from "./Pages/RentMaster/AddRentMasters";
import ListRentMasters from "./Pages/RentMaster/ListRentMasters";
import AddOwnerMasters from "./Pages/OwnerMaster/AddOwnerMasters";
import ListOwnerMasters from "./Pages/OwnerMaster/ListOwnerMasters";
import AddClientMasters from "./Pages/ClientMaster/AddClientMasters";
import ListClientMasters from "./Pages/ClientMaster/ListClientMasters";
import RentTransactionForm from "./Pages/RentMaster/RentTransactionForm";
import Detail from "./Component/Detail";
import RentRecipt from "./Pages/RentRecipt/RentRecipt";
import AdminLogin from "./Component/AdminLogin";
import AdminRegister from "./Component/AdminRegister";
import AdmingForgotPassword from "./Component/AdmingForgotPassword";
import AdminResetPassword from "./Component/AdminResetPassword";
import Payment from "./Component/Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="register" element={<AdminRegister />} />
        <Route path="forgotPassword" element={<AdmingForgotPassword />} />
        <Route path="resetpassword" element={<AdminResetPassword />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="addownermaster" element={<AddOwnerMasters />} />
          <Route path="listownermaster" element={<ListOwnerMasters />} />
          <Route path="addpropertymaster" element={<AddPropertyMasters />} />
          <Route path="listpropertymaster" element={<ListPropertyMasters />} />
          <Route path="addrentmaster" element={<AddRentMasters />} />
          <Route path="listrentmaster" element={<ListRentMasters />} />
          <Route path="addclientmaster" element={<AddClientMasters />} />
          <Route path="addclientmaster/:id" element={<AddClientMasters />} />
          <Route path="listclientmaster" element={<ListClientMasters />} />
          <Route path="listrentrecipt" element={<RentRecipt />} />
          <Route path = 'api-gateway' element={<Payment/>}/>
          <Route
            path=":?/:whichroute/transcation"
            element={<RentTransactionForm />}
          />
          <Route path=":?/:whichroute/detail" element={<Detail />} />
          <Route path=":?/:whichroute/update" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
