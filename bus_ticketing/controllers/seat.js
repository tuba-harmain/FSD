import Seat from "../models/Seat.js";
import Bus from "../models/Bus.js";
import { createError } from "../utils/error.js";


//CREATE
export const createSeat = async (req, res, next) => {
    const busId = req.params.busid;
    const newSeat = new Seat(req.body)

    try {
        const savedSeat = await newSeat.save()
        try{
            await Bus.findByIdAndUpdate(busId, {$push : { seats: savedSeat._id },
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedSeat);
    }catch (err){
        next(err)
    }
}

//UPDATE
export const updateSeat = async (req,res,next) => {
    try {
        const updatedSeat = await Seat.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            {new : true}
            );
        res.status(200).json(updatedSeat);
    } catch (err) {
        next(err);
    }

}

//DELETE
export const deleteSeat = async (req,res,next) => {
    try {
        await Seat.findByIdAndDelete(
           req.params.id
           );
       res.status(200).json("Seat has been deleted.");
   } catch (err) {
        next(err);
   }

}

//GET
export const getSeat = async (req,res,next) => {
    try {
        const seat = await Seat.findById(req.params.id)
        res.status(200).json(seat);
    } catch (err) {
        next(err);
    }
}

//GET ALL
export const getSeats = async (req,res,next) => {
    try {
        const seats = await Seat.find()
        res.status(200).json(seats);
    } catch (err) {
        next(err);
    }
}
