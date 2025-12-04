import express from 'express';
import { addEvent, getSingleEvent, listEvents, removeEvent, updateEvent } from '../controllers/eventController.js';
import multer from 'multer';

const eventRouter = express.Router();

// Multer setup for image storage
const storage = multer.diskStorage({
    destination: "uploads", // folder where images will be stored
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
eventRouter.post("/add", upload.single("image"), addEvent);
eventRouter.get("/list", listEvents);
eventRouter.post("/remove", removeEvent);
eventRouter.get("/:id", getSingleEvent);
eventRouter.put("/update/:id", upload.single("image"), updateEvent);

export default eventRouter;
