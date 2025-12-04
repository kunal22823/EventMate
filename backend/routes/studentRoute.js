import express from "express";
import { listStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

// Endpoints
// studentRouter.post("/add", addStudent);        // Add new student
studentRouter.get("/list", listStudents);      // Get all students
// studentRouter.get("/:id", getStudent);         // Get single student by ID

export default studentRouter;
