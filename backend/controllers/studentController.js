import Student from "../models/studentModel.js";

export const listStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// allow ONLY SIES college email domain
const collegeEmailRegex = /^[^\s@]+@siescoms\.sies\.edu\.in$/i;

// POST /api/students/register
export const registerStudent = async (req, res) => {
  try {
    let { rollno, name, email, batch } = req.body;

    // 1. basic validation
    if (!rollno || !name || !email || !batch) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    // 2. normalize values
    rollno = rollno.toString().trim().toUpperCase();
    email = email.toLowerCase().trim();

    // 3. college email validation
    if (!collegeEmailRegex.test(email)) {
      return res.status(400).json({ error: "INVALID_COLLEGE_EMAIL" });
    }

    // 4. check duplicate roll number per batch
    const exists = await Student.findOne({ rollno, batch });
    if (exists) {
      return res.status(409).json({ error: "ROLLNO_EXISTS" });
    }

    // 5. create student record
    const student = await Student.create({
      rollno,
      name,
      email,
      batch
    });

    // 6. success response
    return res.status(201).json({
      message: "REGISTERED",
      student
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};
