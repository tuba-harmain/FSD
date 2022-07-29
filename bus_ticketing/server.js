import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/api/auth.js";
import adminRoute from "./routes/api/admin.js";
import userRoute from "./routes/api/users.js";
import profileRoute from "./routes/api/profile.js";
import busRoute from "./routes/api/bus.js";
import { createError } from "./utils/error.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()


//Connect Database
const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
  } catch (error) {
    throw(error);
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

app.get('/', (req,res) => res.send('API Running'));

//Define Routes
//middlewares

app.use(cookieParser());
app.use(express.json());

app.use('/auth',    authRoute);
app.use('/admin',   adminRoute);
app.use('/users',   userRoute);
app.use('/profile', profileRoute);
app.use('/bus',   busRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errormessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errormessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connect()
    console.log(`Server started on port ${PORT}`)
});
