// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  name:  { type: String, required: true },
  email: { type: String, required: true },
  batch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;
