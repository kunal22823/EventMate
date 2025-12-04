import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const List = () => {
  const navigate = useNavigate();

  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  // Fetch all events
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/event/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching events");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // Remove event
  const removeEvent = async (eventId) => {
    try {
      const response = await axios.post(`${url}/api/event/remove`, {
        id: eventId,
      });
      fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing event");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p className="main-title">All Events List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Event Name</b>
          <b>Location</b>
          <b>Committee</b>
          <b>Date & Time</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.eventName}</p>
            <p>{item.eventLocation}</p>
            <p>{item.committee}</p>
            <p>{new Date(item.dateTime).toLocaleString()}</p>
            <div className="actions">
              <button
                onClick={() => navigate(`/edit-event/${item._id}`)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => removeEvent(item._id)}
                className="cursor remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
