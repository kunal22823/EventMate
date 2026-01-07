import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const url = "http://localhost:4000";

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [displayEvents, setDisplayEvents] = useState(0);
  const [displayStudents, setDisplayStudents] = useState(0);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await axios.get(`${url}/api/event/list`);
        const studentsRes = await axios.get(`${url}/api/students/list`);

        if (eventsRes.data.success) {
          setTotalEvents(eventsRes.data.data.length);
          setEvents(eventsRes.data.data);
        }

        if (studentsRes.data.success) {
          setTotalStudents(studentsRes.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let eventCount = 0;
    let studentCount = 0;

    const eventInterval = setInterval(() => {
      if (eventCount < totalEvents) {
        eventCount += 1;
        setDisplayEvents(eventCount);
      } else clearInterval(eventInterval);
    }, 50);

    const studentInterval = setInterval(() => {
      if (studentCount < totalStudents) {
        studentCount += 1;
        setDisplayStudents(studentCount);
      } else clearInterval(studentInterval);
    }, 50);

    return () => {
      clearInterval(eventInterval);
      clearInterval(studentInterval);
    };
  }, [totalEvents, totalStudents]);

  const getEventForDate = (date) => {
  return events.find((event) => {
    const eventDate = new Date(event.dateTime);

    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  });
};



  const selectedEvent = getEventForDate(selectedDate);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-main">
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="circle">{displayEvents}</div>
            <p>Total Events</p>
          </div>
          <div className="dashboard-card">
            <div className="circle">{displayStudents}</div>
            <p>Total Students</p>
          </div>
        </div>

          <h3 className="calendar-heading">Here's what's planned:</h3>

          <div className="calendar-layout">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={({ date }) =>
  		getEventForDate(date) ? <span style={{ color: "green" }}>●</span> : null
	      }

            />

            <div className="day-details">
              <h4>{selectedDate.toDateString()}</h4>

              {selectedEvent ? (
                <p className="event-name">
                  [{selectedEvent.committee}] {selectedEvent.eventName}
                </p>
              ) : (
                <p className="no-event">No events planned</p>
              )}
            </div>
          </div>
      </div>
      </div>
    
  );
};

export default Dashboard;
