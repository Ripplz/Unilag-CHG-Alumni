import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Guests from "./components/Portal";
import { BrowserRouter, Route } from 'react-router-dom';
import ProfileForm from "./components/ProfileForm";
import Portal from "./components/Portal";

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
