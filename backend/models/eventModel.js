import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    committee: { type: String, required: true },
    dateTime: { type: Date, required: true },
    registrationLink: { type: String },
    eventLocation: { type: String, required: true },
    locationLink: { type: String },
    image: { type: String, required: true },
}, { timestamps: true });

const eventModel = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default eventModel;
