import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Alumnus from "./Alumnus";

const Portal = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("https://unilag-chg-alumni-server.now.sh/alumni", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        if (data) setAlumni(data);
        else toast("You don't have any submissions yet!");
        if (data.length <= 0) toast("You don't have any submissions yet!");
      })
      .catch(err => {
        toast("An error occured. Please refresh the page");
        console.error(err);
      });
  }, []);

  return (
    <div className="portal_wrapper">
      {alumni &&
        alumni.map((alumnus, index) => (
          <Alumnus key={index} alumnus={alumnus} />
        ))}
    </div>
  );
};

export default Portal;
