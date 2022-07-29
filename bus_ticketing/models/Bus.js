import mongoose from "mongoose";


const BusSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true 
    },
    capacity:{
        type: String,
        required: true 
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    starting:{
        type: String,
        required: true 
    },
    destination:{
        type: String,
        required: true 
    },
    departure:{
        type: String,
        timestamps: true 
    },
    arrival:{
        type: String,
        timestamps: true 
    },
    seats:[
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
}],
    cheapestPrice:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        default : false
    }

});

export default mongoose.model("Bus", BusSchema )

