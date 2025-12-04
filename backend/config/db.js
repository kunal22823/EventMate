import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://krshinde0794:kunal794@cluster0.ifvetmm.mongodb.net/Event?appName=Cluster0').then(()=>console.log("Database is connected"));

}

