import Student from "../models/studentModel.js";

export const listStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const addStudent = async (req, res) => {
//   try {
//     const student = new Student(req.body);
//     await student.save();
//     res.json({ success: true, message: "Student added" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     res.json({ success: true, data: student });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
