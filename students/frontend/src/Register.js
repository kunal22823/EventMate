import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    prefix: "MCA",
    yearcode: "25",
    roll: "",
    name: "",
    email: "",
    mcayear: ""
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
    const response = await fetch("http://localhost:5000/api/students/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rollno,
        name: form.name,
        email: form.email,
        batch: form.batch   
      })
    });

    const data = await response.json();

    // any non-200/201 means some error
    if (!response.ok) {
      if (data.error === "ROLLNO_EXISTS") {
        setErrorMsg("You have already registered with this roll number.");
      } else if (data.error === "MISSING_FIELDS") {
        setErrorMsg("Please fill all required fields.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      return;
    }

    
    setSuccessMsg("Registration successful!");
    setForm({
      prefix: "MCA",
      yearcode: form.yearcode, // keep same batch (25/26)
      roll: "",
      name: "",
      email: "",
      batch: form.batch || ""
    });
  } catch (err) {
    console.error(err);
    setErrorMsg("Unable to connect to server. Please try again later.");
  }
};

  const preview = form.prefix + form.yearcode + (form.roll || "000");

  return (
    <div
      style={{
        maxWidth: "540px",
        margin: "5px auto",
        background: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 0 18px rgba(0,0,0,0.12)",
        fontFamily: "Segoe UI",
        fontSize: "16px"
      }}
    >
      <h1 style={{ textAlign: "center", color: "#003366", marginBottom: "8px", fontSize: "26px" }}>
        SIES College of Management Studies
      </h1>
      <p style={{ textAlign: "center", color: "#8B2E24", marginBottom: "30px" }}>
        Register to receive event updates & reminders.
      <br></br><hr></hr>
      </p>

      <h2 style={{ color: "#003366", marginBottom: "24px", fontSize: "22px" }}>
        Join EventMate Network
      </h2>

      {errorMsg && (
        <div
          style={{
            background: "#ffe5e5",
            color: "#b30000",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: 600
          }}
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div
          style={{
            background: "#d7edff",
            color: "#0056b3",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: 600
          }}
        >
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* ROLL NO */}
        <label style={{ fontWeight: 600, marginBottom: "6px", display: "block" }}>
          Student Roll Number
        </label>

        <div style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
          <input
            value={form.prefix}
            readOnly
            style={{
              width: "30%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #B5B5B5",
              textAlign: "center",
              fontWeight: "700",
              color: "#F28C28"
            }}
          />

          <select
            name="yearcode"
            value={form.yearcode}
            onChange={handleChange}
            style={{
              width: "30%",
              padding: "2px",
              borderRadius: "6px",
              border: "1px solid #B5B5B5",
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            <option value="25">25</option>
            <option value="26">26</option>
          </select>

          <input
            name="roll"
            value={form.roll}
            onChange={handleChange}
            maxLength={3}
            placeholder="078"
            required
            style={{
              width: "40%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #B5B5B5",
              textAlign: "center"
            }}
          />
        </div>

        <p style={{ fontSize: "13px", color: "#444", marginBottom: "18px" }}>
          Example: <b style={{ color: "#003366" }}>MCA25078</b>
        </p>

        

        {/* NAME */}
        <label style={{ fontWeight: 600 }}>Full Name</label> <br></br>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #B5B5B5",
	    marginTop: "5px",
            marginBottom: "22px"
          }}
        />

        {/* EMAIL */}
        <label style={{ fontWeight: 600 }}>Email Address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          pattern="^[^@\s]+@siescoms\.sies\.edu\.in$"
          title="Please use your SIES email (ending with @siescoms.sies.edu.in)"
          placeholder="yourname@siescoms.sies.edu.in"
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #B5B5B5",
	    marginTop: "5px",
            marginBottom: "22px"
          }}
        />

        {/* MCA YEAR DROPDOWN */}
        <label style={{ fontWeight: 600 }}>Current MCA Year</label>
        <select
          name="batch"
          value={form.batch}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #B5B5B5",
	    marginTop: "5px",
            marginBottom: "35px"
          }}
        >
          <option value="">Select MCA Year</option>
          <option value="FY MCA">FY MCA</option>
          <option value="SY MCA">SY MCA</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "#003366",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "18px",
            fontWeight: 600,
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
