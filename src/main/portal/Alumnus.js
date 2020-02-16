import React from "react";
import default_profile_pic from "../../images/default_profile_pic.png";

const Alumnus = props => {
  console.log(props);
  return (
    <div className="alumnus_wrapper">
      <div className="profile_picture_alumnus">
        <img
          className="profile_picture_img"
          alt=""
          src={props.alumnus.photo ? props.alumnus.photo : default_profile_pic}
        />
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
          <span className="detail_text">Phone:</span>
          <span className="detail_text_two">{props.alumnus.phone}</span>
        </div>
        <div className="detail">
          <span className="detail_text">Email:</span>
          <span className="detail_text_two">{props.alumnus.email}</span>
        </div>
        <div className="detail">
          <span className="detail_text">Graduation Year:</span>
          <span className="detail_text_two">
            {props.alumnus.graduationYear}
          </span>
        </div>
        <div className="detail">
          <span className="detail_text">Degree:</span>
          <span className="detail_text_two">{props.alumnus.degree}</span>
        </div>
        {/* <div className="detail">
        <span className="detail_text">Address:</span>
          <span className="detail_text_two">{`${props.alumnus.address}, ${props.alumnus.town}, ${props.alumnus.country}`}</span>
        </div> */}
        <div className="detail">
          <span className="detail_text">Comments:</span>
          <span className="detail_text_two">{props.alumnus.comments}</span>
        </div>
        <div id="throwback-container">
          <h4>Throwback Photos</h4>
          <div className="throwback-photos-container">
            {props.alumnus.throwbackPhotos &&
              props.alumnus.throwbackPhotos.map((photo, index) => (
                <div className="throwback-item" key={index}>
                  <img alt="" src={photo} className="throwback-photo" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumnus;
