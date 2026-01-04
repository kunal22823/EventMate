import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import 'dotenv/config'; 
import eventRouter from './routes/eventRouter.js';
import studentRouter from './routes/studentRoute.js';

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDb();

//API endpoints
app.use("/api/event",eventRouter);
app.use("/images",express.static('uploads'));
app.use("/api/students",studentRouter);


app.get("/",(req,res)=>{
    res.send("API working !");
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})