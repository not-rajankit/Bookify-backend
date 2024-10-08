import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/booking.js";
import bookRoute from "./routes/book.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error", err.message);
  }
};

// app.get('/',(req,res)=>{
//     res.send('working')
// })

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
  connect();
  console.log("Server started on port", port);
});
