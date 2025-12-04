import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: {type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    eventsParticipated: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
            eventName: { type: String, required: true },
            eventDate: { type: Date },
            status: { type: String, default: "Registered" }, 
            certificateUrl: { type: String, default: "" },
        }
    ]
});

const studentModel =
  mongoose.models.user || mongoose.model('student', studentSchema);

export default studentModel;
