import React, { useState } from "react";
import { toast } from "react-toastify";
import default_profile_pic from "../images/default_profile_pic.png";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [photo, setPhoto] = useState(null);

  const submit = event => {
    event.preventDefault();

    if (photo === null) {
      toast("Please upload a profile picture");
      return;
    } else if (window.confirm("Are you sure you want to submit?")) {
      convertFileToBase64(photo, rawPhoto => {
        setIsDisabled(true);
        var submitToastId = toast("Submitting...", { autoClose: false });
        const newAlumnus = {
          lastName,
          firstName,
          otherNames,
          graduationYear,
          phone,
          email,
          street,
          town,
          country,
          photo: rawPhoto
        };
        console.log(newAlumnus);
        fetch("https://unilag-chg-alumni-server.now.sh/add_alumnus", {
          body: JSON.stringify(newAlumnus),
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            toast.dismiss(submitToastId);
            toast("Your data has been successfully submitted.");
            resetForm();
            setIsDisabled(false);
          })
          .catch(err => {
            console.error(err);
            setIsDisabled(false);
          });
      });
    }
  };

  const resetForm = () => {
    setLastName("");
    setOtherNames("");
    setFirstName("");
    setGraduationYear("");
    setPhone("");
    setEmail("");
    setStreet("");
    setTown("");
    setCountry("Nigeria");
    setPhoto(null);
    document.getElementById("profile_picture_img_form").src = default_profile_pic;
  };

  const launchProfilePicturePicker = () => {
    document.getElementById("image_picker").click();
  };

  const updateProfilePicture = () => {
    const imagePicker = document.getElementById("image_picker");
    const files = imagePicker.files;
    if (files.length !== 0) {
      const newImage = files[0];
      const profilePic = document.getElementById("profile_picture_img_form");
      profilePic.src = URL.createObjectURL(newImage);
      setPhoto(newImage);
    }
  };

  const convertFileToBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
      callback("");
    };
  };

  return (
    <div className="main">
      <h3 style={{ textAlign: "center" }}><strong>
        University of Lagos Chemical/Petroleum & Gas Engineering Alumni Portal</strong>
      </h3>
      <h5 style={{ textAlign: "center" }}>
        Please fill in the form below to record your data on the portal
      </h5>
      <div className="profile_picture">
        <img
          className="profile_picture_img"
          id="profile_picture_img_form"
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
      <form onSubmit={submit} id="form_main">
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
            placeholder="Last Name..."
          />{" "}
        </div>

        <div className="form-group">
          <label htmlFor="otherNames">Other Names</label>
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
          <label htmlFor="graduationYear">Graduation Year</label>
          <input
            type="number"
            name="graduationYear"
            maxLength="4"
            value={graduationYear}
            onChange={event => setGraduationYear(event.target.value)}
            required
            placeholder="Graduation Year..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Degree</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            required
            placeholder="Degree..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={event => setPhone(event.target.value)}
            required
            placeholder="Phone Number..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="street">Address</label>
          <input
            type="text"
            name="street"
            value={street}
            onChange={event => setStreet(event.target.value)}
            required
            placeholder="Address..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="town">Town</label>
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
          <label htmlFor="country">Country</label>
          <select
            name="country"
            value={country}
            onChange={event => setCountry(event.target.value)}
            required
            placeholder="Choose..."
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Afghanistan</option>
            <option>Albania</option>
            <option>Algeria</option>
            <option>American Samoa</option>
            <option>Andorra</option>
            <option>Angola</option>
            <option>Anguilla</option>
            <option>Antarctica</option>
            <option>Antigua and/or Barbuda</option>
            <option>Argentina</option>
            <option>Armenia</option>
            <option>Aruba</option>
            <option>Australia</option>
            <option>Austria</option>
            <option>Azerbaijan</option>
            <option>Bahamas</option>
            <option>Bahrain</option>
            <option>Bangladesh</option>
            <option>Barbados</option>
            <option>Belarus</option>
            <option>Belgium</option>
            <option>Belize</option>
            <option>Benin</option>
            <option>Bermuda</option>
            <option>Bhutan</option>
            <option>Bolivia</option>
            <option>Bosnia and Herzegovina</option>
            <option>Botswana</option>
            <option>Bouvet Island</option>
            <option>Brazil</option>
            <option>British Indian Ocean Territory</option>
            <option>Brunei Darussalam</option>
            <option>Bulgaria</option>
            <option>Burkina Faso</option>
            <option>Burundi</option>
            <option>Cambodia</option>
            <option>Cameroon</option>
            <option>Cape Verde</option>
            <option>Cayman Islands</option>
            <option>Central African Republic</option>
            <option>Chad</option>
            <option>Chile</option>
            <option>China</option>
            <option>Christmas Island</option>
            <option>Cocos (Keeling) Islands</option>
            <option>Colombia</option>
            <option>Comoros</option>
            <option>Congo</option>
            <option>Cook Islands</option>
            <option>Costa Rica</option>
            <option>Croatia (Hrvatska)</option>
            <option>Cuba</option>
            <option>Cyprus</option>
            <option>Czech Republic</option>
            <option>Denmark</option>
            <option>Djibouti</option>
            <option>Dominica</option>
            <option>Dominican Republic</option>
            <option>East Timor</option>
            <option>Ecudaor</option>
            <option>Egypt</option>
            <option>El Salvador</option>
            <option>Equatorial Guinea</option>
            <option>Eritrea</option>
            <option>Estonia</option>
            <option>Ethiopia</option>
            <option>Falkland Islands (Malvinas)</option>
            <option>Faroe Islands</option>
            <option>Fiji</option>
            <option>Finland</option>
            <option>France</option>
            <option>France, Metropolitan</option>
            <option>French Guiana</option>
            <option>French Polynesia</option>
            <option>French Southern Territories</option>
            <option>Gabon</option>
            <option>Gambia</option>
            <option>Georgia</option>
            <option>Germany</option>
            <option>Ghana</option>
            <option>Gibraltar</option>
            <option>Greece</option>
            <option>Greenland</option>
            <option>Grenada</option>
            <option>Guadeloupe</option>
            <option>Guam</option>
            <option>Guatemala</option>
            <option>Guinea</option>
            <option>Guinea-Bissau</option>
            <option>Guyana</option>
            <option>Haiti</option>
            <option>Heard and Mc Donald Islands</option>
            <option>Honduras</option>
            <option>Hong Kong</option>
            <option>Hungary</option>
            <option>Iceland</option>
            <option>India</option>
            <option>Indonesia</option>
            <option>Iran (Islamic Republic of)</option>
            <option>Iraq</option>
            <option>Ireland</option>
            <option>Israel</option>
            <option>Italy</option>
            <option>Ivory Coast</option>
            <option>Jamaica</option>
            <option>Japan</option>
            <option>Jordan</option>
            <option>Kazakhstan</option>
            <option>Kenya</option>
            <option>Kiribati</option>
            <option>Korea, Democratic People's Republic of</option>
            <option>Korea, Republic of</option>
            <option>Kosovo</option>
            <option>Kuwait</option>
            <option>Kyrgyzstan</option>
            <option>Lao People's Democratic Republic</option>
            <option>Latvia</option>
            <option>Lebanon</option>
            <option>Lesotho</option>
            <option>Liberia</option>
            <option>Libyan Arab Jamahiriya</option>
            <option>Liechtenstein</option>
            <option>Lithuania</option>
            <option>Luxembourg</option>
            <option>Macau</option>
            <option>Macedonia</option>
            <option>Madagascar</option>
            <option>Malawi</option>
            <option>Malaysia</option>
            <option>Maldives</option>
            <option>Mali</option>
            <option>Malta</option>
            <option>Marshall Islands</option>
            <option>Martinique</option>
            <option>Mauritania</option>
            <option>Mauritius</option>
            <option>Mayotte</option>
            <option>Mexico</option>
            <option>Micronesia, Federated States of</option>
            <option>Moldova, Republic of</option>
            <option>Monaco</option>
            <option>Mongolia</option>
            <option>Montserrat</option>
            <option>Morocco</option>
            <option>Mozambique</option>
            <option>Myanmar</option>
            <option>Namibia</option>
            <option>Nauru</option>
            <option>Nepal</option>
            <option>Netherlands</option>
            <option>Netherlands Antilles</option>
            <option>New Caledonia</option>
            <option>New Zealand</option>
            <option>Nicaragua</option>
            <option>Niger</option>
            <option>Nigeria</option>
            <option>Niue</option>
            <option>Norfork Island</option>
            <option>Northern Mariana Islands</option>
            <option>Norway</option>
            <option>Oman</option>
            <option>Pakistan</option>
            <option>Palau</option>
            <option>Panama</option>
            <option>Papua New Guinea</option>
            <option>Paraguay</option>
            <option>Peru</option>
            <option>Philippines</option>
            <option>Pitcairn</option>
            <option>Poland</option>
            <option>Portugal</option>
            <option>Puerto Rico</option>
            <option>Qatar</option>
            <option>Reunion</option>
            <option>Romania</option>
            <option>Russian Federation</option>
            <option>Rwanda</option>
            <option>Saint Kitts and Nevis</option>
            <option>Saint Lucia</option>
            <option>Saint Vincent and the Grenadines</option>
            <option>Samoa</option>
            <option>San Marino</option>
            <option>Sao Tome and Principe</option>
            <option>Saudi Arabia</option>
            <option>Senegal</option>
            <option>Seychelles</option>
            <option>Sierra Leone</option>
            <option>Singapore</option>
            <option>Slovakia</option>
            <option>Slovenia</option>
            <option>Solomon Islands</option>
            <option>Somalia</option>
            <option>South Africa</option>
            <option>South Georgia South Sandwich Islands</option>
            <option>South Sudan</option>
            <option>Spain</option>
            <option>Sri Lanka</option>
            <option>St. Helena</option>
            <option>St. Pierre and Miquelon</option>
            <option>Sudan</option>
            <option>Suriname</option>
            <option>Svalbarn and Jan Mayen Islands</option>
            <option>Swaziland</option>
            <option>Sweden</option>
            <option>Switzerland</option>
            <option>Syrian Arab Republic</option>
            <option>Taiwan</option>
            <option>Tajikistan</option>
            <option>Tanzania, United Republic of</option>
            <option>Thailand</option>
            <option>Togo</option>
            <option>Tokelau</option>
            <option>Tonga</option>
            <option>Trinidad and Tobago</option>
            <option>Tunisia</option>
            <option>Turkey</option>
            <option>Turkmenistan</option>
            <option>Turks and Caicos Islands</option>
            <option>Tuvalu</option>
            <option>Uganda</option>
            <option>Ukraine</option>
            <option>United Arab Emirates</option>
            <option>United Kingdom</option>
            <option>United States minor outlying islands</option>
            <option>Uruguay</option>
            <option>Uzbekistan</option>
            <option>Vanuatu</option>
            <option>Vatican City State</option>
            <option>Venezuela</option>
            <option>Vietnam</option>
            <option>Virigan Islands (British)</option>
            <option>Virgin Islands (U.S.)</option>
            <option>Wallis and Futuna Islands</option>
            <option>Western Sahara</option>
            <option>Yemen</option>
            <option>Yugoslavia</option>
            <option>Zaire</option>
            <option>Zambia</option>
            <option>Zimbabwe</option>
          </select>
        </div>

        <button id="button" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
