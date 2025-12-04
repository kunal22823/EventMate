import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const url = "http://localhost:4000"; 
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const [displayEvents, setDisplayEvents] = useState(0);
  const [displayStudents, setDisplayStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await axios.get(`${url}/api/event/list`);
        const studentsRes = await axios.get(`${url}/api/student/list`);
        if (eventsRes.data.success) setTotalEvents(eventsRes.data.data.length);
        if (studentsRes.data.success) setTotalStudents(studentsRes.data.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Count-up animation
  useEffect(() => {
    let eventCount = 0;
    let studentCount = 0;
    const eventInterval = setInterval(() => {
      if (eventCount < totalEvents) {
        eventCount += 1;
        setDisplayEvents(eventCount);
      } else {
        clearInterval(eventInterval);
      }
    }, 50); // speed (50ms per increment)

    const studentInterval = setInterval(() => {
      if (studentCount < totalStudents) {
        studentCount += 1;
        setDisplayStudents(studentCount);
      } else {
        clearInterval(studentInterval);
      }
    }, 50);

    return () => {
      clearInterval(eventInterval);
      clearInterval(studentInterval);
    };
  }, [totalEvents, totalStudents]);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
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
    </div>
  );
};

export default Dashboard;
