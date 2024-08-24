import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    
    userId: {
      type:mongoose.Types.ObjectId,
        ref: "User",
    },
   bookId:{
        type:mongoose.Types.ObjectId,
        ref: "Book",
    },
    borrowedAt:{
        type:Date,
        default: new Date().toISOString()
    },
    returnDate:{
      type:Date
    }

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
