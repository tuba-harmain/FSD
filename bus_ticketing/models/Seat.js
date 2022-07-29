import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    berthType: {
      type: String,
      required: true
    },
    seatNumbers: [{ 
      number: Number, unavailableDates: {type: [Date]}
    }],    
  },
  { timestamps: true }
);

export default mongoose.model("Seat", SeatSchema);