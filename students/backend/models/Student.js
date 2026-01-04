// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  name:  { type: String, required: true },
  email: { type: String, required: true },
  batch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
