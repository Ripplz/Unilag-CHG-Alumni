import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Alumnus from "../portal/Alumnus";
import "./AdminPortal.css";

const AdminPortal = () => {
  const [alumni, setAlumni] = useState([]);

  // let fetchUrl = "https://unilag-chg-alumni-server.now.sh/alumni"
  let fetchUrl = "http://localhost:3005/alumni";

  useEffect(() => {
    var submitToastId = toast.info("Loading Alumni...", { autoClose: false });
    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(submitToastId);
        if (data) setAlumni(data);
        else toast.warn("You don't have any submissions yet!");
        if (data.length <= 0) toast.warn("You don't have any submissions yet!");
      })
      .catch(err => {
        toast.error("An error occured. Please refresh the page");
        console.error(err);
      });
  }, []);

  return (
    <div className="portal_wrapper">
      {alumni &&
        alumni.map((alumnus, index) => (
          <Alumnus key={index} alumnus={alumnus} isAdmin />
        ))}
    </div>
  );
};

export default AdminPortal;
