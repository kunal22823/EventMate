import express from "express";
import {registerStudent,listStudents} from "../controllers/studentController.js";

const studentRouter = express.Router();

// Register new student
studentRouter.post("/register", registerStudent);

// Get all students
studentRouter.get("/list", listStudents);

// studentRouter.get("/:id", getStudent); // optional – single student

export default studentRouter;
