import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import Portal from "../main/portal/Portal";
import ProfileForm from "../main/form/ProfileForm";
import AccountPage from "../main/account/AccountPage";
import AdminPortal from "../main/admin/AdminPortal";

function App() {
  return (
    <div className="wrapper">
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ProfileForm} />
          <Route exact path="/portal" component={Portal} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/admin" component={AdminPortal} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
