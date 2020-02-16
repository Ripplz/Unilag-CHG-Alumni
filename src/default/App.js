import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import Portal from "../main/portal/Portal";
import ProfileForm from "../main/form/ProfileForm";

function App() {
  return (
    <div className="wrapper">
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Route exact path="/" component={ProfileForm} />
          <Route exact path="/portal" component={Portal} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
