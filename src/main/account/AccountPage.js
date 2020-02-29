import React, { useState } from "react";
import { toast } from "react-toastify";
import default_profile_pic from "../../images/default_profile_pic.png";
import "react-toastify/dist/ReactToastify.css";
import "./AccountPage.css";
import Alumnus from "../portal/Alumnus";

const AccountPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alumnus, setAlumnus] = useState(null);

  const login = event => {
    event.preventDefault();
    var submitToastId = toast.info("Submitting...", { autoClose: false });
    let fetchUrl = `https://unilag-chg-alumni-server.now.sh/get_alumnus?email=${email}&password=${password}`;
    // let fetchUrl = `http://localhost:3005/get_alumnus?email=${email}&password=${password}`;

    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.dismiss(submitToastId);
        if (data) setAlumnus(data);
        else toast.error("An error occurred. Please try again");
        if (data.length <= 0) toast.error("An error occurred. Please try again");
      })
      .catch(err => {
        toast.dismiss(submitToastId);
        toast.error("An error occurred. Please refresh the page");
        console.error(err);
      });
  };

  return alumnus === null ? (
    <div className="main">
      <h3 style={{ textAlign: "center" }}>
        <strong>Login to your Account</strong>
      </h3>
      <form onSubmit={login} id="form_account">
        <div className="form-group">
          {/* <label htmlFor="lastName">Last Name</label> */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            placeholder="Email..."
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            placeholder="Password..."
          />
        </div>

        <button id="button" disabled={isDisabled}>
          Login
        </button>
      </form>
    </div>
  ) : (
    <div className="portal_wrapper">
      {alumnus.map((alumnus, index) => (
        <Alumnus key={index} alumnus={alumnus} isAdmin={true} />
      ))}
    </div>
  );
};

export default AccountPage;
