import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    eventName: "",
    description: "",
    committee: "",
    dateTime: "",
    registrationLink: "",
    eventLocation: "",
    locationLink: "",
});


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Function to prevent selecting past dates/times
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("description", data.description);
    formData.append("committee", data.committee);
    formData.append("dateTime", data.dateTime);
    formData.append("registrationLink", data.registrationLink);
    formData.append("eventLocation", data.eventLocation);
    formData.append("locationLink", data.locationLink);

    formData.append("image", image);


    try {
      const response = await axios.post(`${url}/api/event/add`, formData);

      if (response.data.success) {
        setData({
    eventName: "",
    description: "",
    committee: "",
    dateTime: "",
    registrationLink: "",
    eventLocation: "",
    locationLink: "",
});

        setImage(false);
        toast.success("Event Added Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandle}>
        {/* Event Banner */}
        <div className="add-image-upload">
          <p>Event Banner</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Event Banner"
            />
            <input
              type="file"
              id="image"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Event Name + Organizing Committee */}
        <div className="form-row">
          <div className="input-group">
            <p>Event Name</p>
            <input
              type="text"
              name="eventName"
              placeholder="Enter event name"
              value={data.eventName}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-group">
            <p>Organizing Committee</p>
            <input
              type="text"
              name="committee"
              placeholder="Committee name (e.g., CSI Committee)"
              value={data.committee}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* Date + Registration Link */}
        <div className="form-row">
          <div className="input-group">
            <p>Event Date & Time</p>
            <input
              type="datetime-local"
              name="dateTime"
              min={getMinDateTime()}
              value={data.dateTime}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-group">
            <p>Registration Link (optional)</p>
            <input
              type="url"
              name="registrationLink"
              placeholder="https://example.com/register"
              value={data.registrationLink}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        {/* Event Location + Location Link */}
        <div className="form-row">
          <div className="input-group">
            <p>Event Location</p>
            <input
              type="text"
              name="eventLocation"
              placeholder="e.g., Seminar Hall, 3rd Floor"
              value={data.eventLocation}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <p>Location Link (Optional)</p>
            <input
              type="url"
              name="locationLink"
              placeholder="https://maps.google.com/..."
              value={data.locationLink}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="add-event-description">
          <p>Short Description</p>
          <textarea
            rows="6"
            name="description"
            placeholder="Describe the event"
            value={data.description}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default Add;
