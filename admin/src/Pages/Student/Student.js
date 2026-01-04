import React, { useEffect, useState } from "react";
import "./Student.css";
import axios from "axios";
import { toast } from "react-toastify";

const Students = () => {
  const url = "http://localhost:4000";
  const [students, setStudents] = useState([]);

  // Fetch all students
  const fetchAllStudents = async () => {
    try {
      const response = await axios.get(`${url}/api/students/list`);

      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error("Error fetching students");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <div className="students add">
      <h3>Registered Students</h3>

      <div className="student-list">
        {students.length === 0 && <p>No students registered yet.</p>}

        {students.map((stu, index) => (
          <div key={stu._id || index} className="student-item">
            <div>
              <p className="student-name">
                <strong>Name:</strong> {stu.name}
              </p>

              <p className="student-roll">
                <strong>Roll No:</strong> {stu.rollno}
              </p>

              <p className="student-batch">
                <strong>MCA Year:</strong> {stu.batch}
              </p>

              <p className="student-email">
                <strong>Email:</strong> {stu.email}
              </p>

              <p className="student-date">
                <strong>Registered On:</strong>{" "}
                {new Date(stu.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
