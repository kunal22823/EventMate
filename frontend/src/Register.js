import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    prefix: "MCA",
    yearcode: "25",
    roll: "",
    name: "",
    email: "",
    batch: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rollno = form.prefix + form.yearcode + form.roll;

    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(
        "http://localhost:4000/api/students/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rollno,
            name: form.name,
            email: form.email,
            batch: form.batch
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "ROLLNO_EXISTS") {
          setErrorMsg("You have already registered with this roll number.");
        } else if (data.error === "INVALID_COLLEGE_EMAIL") {
          setErrorMsg("Please use your official SIES email ID.");
        } else if (data.error === "MISSING_FIELDS") {
          setErrorMsg("Please fill all required fields.");
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
        return;
      }

      setSuccessMsg("Registration successful!");

      // reset form (keep yearcode)
      setForm({
        prefix: "MCA",
        yearcode: form.yearcode,
        roll: "",
        name: "",
        email: "",
        batch: ""
      });

    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to connect to server. Please try again later.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "540px",
        margin: "10px auto",
        background: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 0 18px rgba(0,0,0,0.12)",
        fontFamily: "Segoe UI"
      }}
    >
      <h1 style={{ textAlign: "center", color: "#003366" }}>
        SIES College of Management Studies
      </h1>

      <p style={{ textAlign: "center", color: "#8B2E24", marginBottom: "30px" }}>
        Register to receive event updates & reminders.
      </p>

      {errorMsg && (
        <div style={{ background: "#ffe5e5", color: "#b30000", padding: "12px", marginBottom: "15px", textAlign: "center" }}>
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ background: "#d7edff", color: "#0056b3", padding: "12px", marginBottom: "15px", textAlign: "center" }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ROLL NUMBER */}
        <label><b>Student Roll Number</b></label>

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <input value={form.prefix} readOnly style={{ width: "30%", textAlign: "center" }} />

          <select name="yearcode" value={form.yearcode} onChange={handleChange} style={{ width: "30%" }}>
            <option value="25">25</option>
            <option value="26">26</option>
          </select>

          <input
            name="roll"
            value={form.roll}
            onChange={(e) =>
              /^[0-9]*$/.test(e.target.value) &&
              setForm({ ...form, roll: e.target.value })
            }
            maxLength={3}
            placeholder="078"
            required
            style={{ width: "40%", textAlign: "center" }}
          />
        </div>

        <p style={{ fontSize: "13px", marginBottom: "20px" }}>
          Example: <b>MCA25078</b>
        </p>

        {/* NAME */}
        <label><b>Full Name</b></label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "20px" }}
        />

        {/* EMAIL */}
        <label><b>Email Address</b></label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          pattern="^[^@\s]+@siescoms\.sies\.edu\.in$"
          title="Use SIES college email only"
          required
          style={{ width: "100%", marginBottom: "20px" }}
        />

        {/* MCA YEAR */}
        <label><b>Current MCA Year</b></label>
        <select
          name="batch"
          value={form.batch}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "30px" }}
        >
          <option value="">Select MCA Year</option>
          <option value="FY MCA">FY MCA</option>
          <option value="SY MCA">SY MCA</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "#003366",
            color: "white",
            border: "none",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
