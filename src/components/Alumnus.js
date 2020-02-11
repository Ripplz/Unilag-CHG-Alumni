import React from "react";
import default_profile_pic from "../images/default_profile_pic.png";
import phone from "../images/phone.svg";
import email from "../images/mail.svg";
import calendar from "../images/calendar.png";
import location from "../images/location.png";

const Alumnus = props => {
  return (
    <div className="alumnus_wrapper">
      <div className="profile_picture_alumnus">
        <img className="profile_picture_img" alt="" src={props.alumnus.photo ? props.alumnus.photo : default_profile_pic} />
        <h2 className="heading alumnus_name">{`${props.alumnus.lastName} ${props.alumnus.otherNames}`}</h2>
      </div>
      <div className="details">
        <div className="detail">
          {/* <img
            src={phone}
            width="24"
            height="24"
            className="detail_icon"
            alt=""
          /> */}
          <span className="detail_text">Phone: &nbsp;&nbsp;</span>
          <span className="detail_text_two">{props.alumnus.phone}</span>
        </div>
        <div className="detail">
        <span className="detail_text">Email: &nbsp;&nbsp;</span>
          <span className="detail_text_two">{props.alumnus.email}</span>
        </div>
        <div className="detail">
        <span className="detail_text">Graduation Year: &nbsp;&nbsp;</span>
          <span className="detail_text_two">{props.alumnus.graduationYear}</span>
        </div>
        <div className="detail">
        <span className="detail_text">Degree: &nbsp;&nbsp;</span>
          <span className="detail_text_two">{props.alumnus.firstName}</span>
        </div>
        <div className="detail">
        <span className="detail_text">Address: &nbsp;&nbsp;</span>
          <span className="detail_text_two">{`${props.alumnus.street}, ${props.alumnus.town}, ${props.alumnus.country}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Alumnus;
