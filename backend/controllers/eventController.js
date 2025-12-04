import eventModel from "../models/eventModel.js";
import fs from "fs";
import nodemailer from "nodemailer";

//Add new event
const addEvent = async (req, res) => {
    try {
        const image_filename = req.file.filename;

        const event = new eventModel({
            eventName: req.body.eventName,
            description: req.body.description,
            committee: req.body.committee,
            dateTime: req.body.dateTime,
            registrationLink: req.body.registrationLink || "",
            eventLocation: req.body.eventLocation,
            locationLink: req.body.locationLink || "",
            image: image_filename,
        });

        await event.save();

        // --------------------- EMAIL NOTIFICATION ---------------------
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: `"Event-Mate" <${process.env.EMAIL_USER}>`,
            to: "harishn.mca25@siescoms.sies.edu.in",
            subject: `New Event Added: ${event.eventName}`,
            html: `
                <h2>New Event Alert 🚀</h2>
                <p>A new event has been added on the portal.</p>

                <h3>${event.eventName}</h3>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Committee:</strong> ${event.committee}</p>
                <p><strong>Date & Time:</strong> ${event.dateTime}</p>
                <p><strong>Location:</strong> ${event.eventLocation}</p>

                ${
                    event.registrationLink
                        ? `<p><strong>Register Here:</strong> <a href="${event.registrationLink}">${event.registrationLink}</a></p>`
                        : ""
                }

                <p>Visit the website for more details.</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        // --------------------------------------------------------------

        res.json({ success: true, message: "New Event Added & Email Sent" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

// List all events
const listEvents = async (req, res) => {
    try {
        const events = await eventModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: events });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching events" });
    }
};

// Remove event
const removeEvent = async (req, res) => {
    try {
        const event = await eventModel.findById(req.body.id);

        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }

        // Delete image file
        fs.unlink(`uploads/${event.image}`, (err) => {
            if (err) console.log("Error deleting image:", err);
        });

        await eventModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Event removed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while removing event" });
    }
};
// Get single event
const getSingleEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    res.json({ success: true, data: event });
  } catch (error) {
    res.json({ success: false, message: "Error fetching event" });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);

    if (!event) return res.json({ success: false, message: "Not found" });

    let imageFilename = event.image;

    if (req.file) {
      fs.unlink(`uploads/${event.image}`, () => {});
      imageFilename = req.file.filename;
    }

    await eventModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image: imageFilename,
    });

    res.json({ success: true, message: "Event updated" });
  } catch (error) {
    res.json({ success: false, message: "Update failed" });
  }
};

export { addEvent, listEvents, removeEvent,getSingleEvent,updateEvent };
