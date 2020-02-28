import React, { useState } from "react";
import { toast } from "react-toastify";
import default_profile_pic from "../../images/default_profile_pic.png";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileForm.css";
import countries from "../../utils/countries";
import add_icon from "../../images/add.svg";
import question_icon from "../../images/question.svg";
import swal from "sweetalert";

const ProfileForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");

  const initialDegreeSelections = ["BSc.", "MSc.", "PhD."];

  const [degrees, setDegrees] = useState([
    {
      degreeType: initialDegreeSelections[0],
      graduationYear: "",
      throwbackPhotos: [],
      comment: "",
      privacy: true
    }
  ]);

  const submit = async event => {
    event.preventDefault();

    if (photo === null) {
      toast.warn("Please upload a profile picture");
      return;
    } else if (window.confirm("Are you sure you want to submit?")) {
      const rawPhoto = await convertFileToBase64(photo);
      setIsDisabled(true);
      var submitToastId = toast.info("Submitting...", { autoClose: false });
      const newAlumnus = {
        lastName,
        otherNames,
        phone,
        email,
        address,
        town,
        country,
        password,
        photo: rawPhoto,
        degrees
      };
      console.log(newAlumnus);
      // console.log(JSON.stringify(newAlumnus));
      // let fetchUrl = "https://unilag-chg-alumni-server.now.sh/add_alumnus";
      let fetchUrl = "http://localhost:3005/add_alumnus";
      fetch(fetchUrl, {
        body: JSON.stringify(newAlumnus),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          toast.dismiss(submitToastId);
          toast.success("Your data has been successfully submitted.");
          resetForm();
          setIsDisabled(false);
        })
        .catch(err => {
          console.error(err);
          setIsDisabled(false);
        });
    }
  };

  const resetForm = () => {
    setLastName("");
    setOtherNames("");
    setPhone("");
    setEmail("");
    setAddress("");
    setTown("");
    setCountry("Nigeria");
    setPassword("");
    setPhoto(null);
    setDegrees([
      {
        degreeType: initialDegreeSelections[0],
        graduationYear: "",
        throwbackPhotos: [],
        comment: "",
        privacy: true
      }
    ]);

    document.getElementById("img_profile_picture").src = default_profile_pic;
  };

  const launchProfilePicturePicker = () => {
    document.getElementById("image_picker").click();
  };

  const updateProfilePicture = () => {
    const imagePicker = document.getElementById("image_picker");
    const files = imagePicker.files;
    if (files.length !== 0) {
      const newImage = files[0];
      const profilePic = document.getElementById("img_profile_picture");
      profilePic.src = URL.createObjectURL(newImage);
      setPhoto(newImage);
    }
  };

  const launchThrowbackPhotoPicker = index => {
    document.getElementsByClassName("throwback_photo_picker")[index].click();
  };

  const addThrowbackPhoto = async index => {
    const allDegrees = [...degrees];
    const degree = allDegrees[index];
    const imagePicker = document.getElementsByClassName(
      "throwback_photo_picker"
    )[index];
    const files = imagePicker.files;
    if (files.length !== 0) {
      let allThrowbacks = [...degree.throwbackPhotos];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const convertedFile = await convertFileToBase64(file);
        allThrowbacks.push(convertedFile);
      }
      degree.throwbackPhotos = allThrowbacks;
      allDegrees[index] = degree;
      setDegrees(allDegrees);
    }
  };

  const convertFileToBase64 = file => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const showInfo = () =>
    swal({
      title: "About this portal",
      text: "This portal is for the United States of Unilag. Allows you to.",
      icon: "info",
      button: "OK"
    });

  const performAddDegree = event => {
    event.preventDefault();
    const newIndex = degrees.length;

    const allDegrees = [...degrees];

    allDegrees[newIndex] = {
      degreeType: initialDegreeSelections[0],
      graduationYear: "",
      throwbackPhotos: [],
      comment: "",
      privacy: true
    };
    setDegrees(allDegrees);
  };

  const performRemoveDegree = (event, index) => {
    event.preventDefault();
    if (degrees.length <= 1) return;
    const allDegrees = [...degrees];
    allDegrees.splice(index, 1);
    setDegrees(allDegrees);
  };

  const setDegreeType = (newDegreeType, index) => {
    const allDegrees = [...degrees];
    allDegrees[index].degreeType = newDegreeType;
    setDegrees(allDegrees);
  };

  const setDegreeGraduationYear = (newGraduationYear, index) => {
    const allDegrees = [...degrees];
    allDegrees[index].graduationYear = newGraduationYear;
    setDegrees(allDegrees);
  };

  const setDegreeComment = (newComment, index) => {
    const allDegrees = [...degrees];
    allDegrees[index].comment = newComment;
    setDegrees(allDegrees);
  };

  const setDegreePrivacy = (newPrivacy, index) => {
    const allDegrees = [...degrees];
    allDegrees[index].privacy = newPrivacy;
    setDegrees(allDegrees);
  };

  return (
    <div className="main">
      <h3 style={{ textAlign: "center" }}>
        <strong>
          University of Lagos Chemical/Petroleum & Gas Engineering Alumni Portal
        </strong>
      </h3>
      <h5 style={{ textAlign: "center" }}>
        Please fill in the form below to record your data on the portal
      </h5>
      <div id="header">
        <img id="img_info" src={question_icon} alt="" onClick={showInfo} />
        <div id="wrapper_profile_picture">
          <img
            id="img_profile_picture"
            onClick={launchProfilePicturePicker}
            alt=""
            src={default_profile_pic}
          />
          <input
            type="file"
            id="image_picker"
            accept=".jpg, .jpeg, .png"
            onChange={updateProfilePicture}
          />
          <h4
            className="heading"
            id="student_name"
            style={{ textDecoration: "underline" }}
            onClick={launchProfilePicturePicker}
          >
            Upload Profile Picture
          </h4>
        </div>
      </div>
      <form onSubmit={submit} id="form_main">
        <div className="form-group">
          {/* <label htmlFor="lastName">Last Name</label> */}
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
            placeholder="Last Name..."
          />
          <input
            type="text"
            name="otherNames"
            value={otherNames}
            onChange={event => setOtherNames(event.target.value)}
            required
            placeholder="Other Names..."
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="phone">Phone</label> */}
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={event => setPhone(event.target.value)}
            required
            placeholder="Phone Number..."
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            placeholder="Email Address..."
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="address">Address</label> */}
          <input
            type="text"
            name="address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            required
            placeholder="Address..."
          />
          <input
            type="text"
            name="town"
            value={town}
            onChange={event => setTown(event.target.value)}
            required
            placeholder="Town..."
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="country">Country</label> */}
          <select
            name="country"
            value={country}
            onChange={event => setCountry(event.target.value)}
            required
            placeholder="Choose..."
          >
            {countries &&
              countries.map((value, key) => <option key={key}>{value}</option>)}
          </select>

          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            placeholder="Password..."
          />
        </div>

        <hr className="line" />

        {degrees &&
          degrees.map((singleDegree, index) => (
            <div className="wrapper_degree" key={index}>
              <div className="form-group">
                {/* <label htmlFor="graduationYear">Graduation Year</label> */}
                <select
                  name="degree"
                  value={singleDegree.degreeType}
                  onChange={event => setDegreeType(event.target.value, index)}
                  required
                  placeholder="Choose Degree..."
                >
                  {initialDegreeSelections &&
                    initialDegreeSelections.map((value, key) => (
                      <option key={key}>{value}</option>
                    ))}
                </select>

                <input
                  type="number"
                  name="graduationYear"
                  maxLength="4"
                  value={singleDegree.graduationYear}
                  onChange={event =>
                    setDegreeGraduationYear(event.target.value, index)
                  }
                  required
                  placeholder="Graduation Year..."
                />
              </div>

              <span className="title-throwback-photos">
                Throwback Photos (Optional)
              </span>
              <div className="throwback-photos-container">
                {singleDegree.throwbackPhotos &&
                  singleDegree.throwbackPhotos.map((photo, index) => (
                    <div className="throwback-item" key={index}>
                      <img alt="" src={photo} className="throwback-photo" />
                    </div>
                  ))}
                <div
                  className="throwback-item add-throwback"
                  onClick={() => launchThrowbackPhotoPicker(index)}
                >
                  <img alt="" src={add_icon} />
                </div>
                <input
                  type="file"
                  className="throwback_photo_picker"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={() => addThrowbackPhoto(index)}
                />
              </div>

              <textarea
                name="comment"
                placeholder="Additional comments... (optional)"
                value={singleDegree.comment}
                className="textarea_comments"
                onChange={event => setDegreeComment(event.target.value, index)}
              />

              <div className="wrapper-degree-footer">
                <span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="throwback-photos-privacy-switch"
                      checked={singleDegree.privacy}
                      onChange={event =>
                        setDegreePrivacy(event.target.checked, index)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                  <span
                    className="throwback-photos-privacy-text"
                    onClick={() =>
                      setDegreePrivacy(!singleDegree.privacy, index)
                    }
                  >
                    {singleDegree.privacy ? "Public" : "Private"}
                  </span>
                </span>

                {index > 0 && (
                  <button
                    className="btn-remove-degree"
                    onClick={event => performRemoveDegree(event, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

        <button id="btn-add-degree" onClick={performAddDegree}>
          Add Degree
        </button>

        <button id="button" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
