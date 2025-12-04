import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditEvent.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:4000";

  const [data, setData] = useState({
    eventName: "",
    description: "",
    committee: "",
    dateTime: "",
    registrationLink: "",
    eventLocation: "",
    locationLink: "",
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${url}/api/event/${id}`);
      if (res.data.success) {
        setData(res.data.data);
        setOldImage(res.data.data.image);
      }
    } catch (error) {
      toast.error("Error loading event details");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(`${url}/api/event/update/${id}`, formData);
      if (res.data.success) {
        toast.success("Event updated");
        navigate("/list");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="add">
      <form onSubmit={updateEvent}>
        <p className="main-title">Edit Event</p>

        <div className="add-image-upload">
          <p>Event Banner</p>

          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : `${url}/images/${oldImage}`}
              alt="banner"
            />
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        <div className="form-row">
          <div className="input-group">
            <p>Event Name</p>
            <input
              type="text"
              name="eventName"
              value={data.eventName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <p>Committee</p>
            <input
              type="text"
              name="committee"
              value={data.committee}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <p>Date & Time</p>
            <input
              type="datetime-local"
              name="dateTime"
              value={data.dateTime?.slice(0, 16)}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <p>Registration Link</p>
            <input
              type="url"
              name="registrationLink"
              value={data.registrationLink}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <p>Event Location</p>
            <input
              type="text"
              name="eventLocation"
              value={data.eventLocation}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <p>Location Link</p>
            <input
              type="url"
              name="locationLink"
              value={data.locationLink}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="add-event-description">
          <p>Description</p>
          <textarea
            rows="6"
            name="description"
            value={data.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <button className="add-btn" type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
