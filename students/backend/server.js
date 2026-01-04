const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb+srv://siescoms_event:eventMate@cluster0.eqcpqnx.mongodb.net/sies_students?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/students", studentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
