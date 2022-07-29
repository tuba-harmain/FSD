 import Bus from "../models/Bus.js";
 import Seat from "../models/Seat.js";

//CREATE
export const createBus = async (req,res,next) => {
    const newBus = new Bus(req.body)   
    try {
        const savedBus = await newBus.save()
        res.status(200).json(savedBus)
    } catch (err) {
        next(err);
    }
}

//UPDATE
export const updateBus = async (req,res,next) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            {new : true}
            );
        res.status(200).json(updatedBus);
    } catch (err) {
        next(err);
    }

}

//DELETE
export const deleteBus = async (req,res,next) => {
    try {
        await Bus.findByIdAndDelete(
           req.params.id
           );
       res.status(200).json("Bus has been deleted.");
   } catch (err) {
        next(err);
   }

}

//GET
export const getBus = async (req,res,next) => {
    try {
        const bus = await Bus.findById(req.params.id)
        res.status(200).json(bus);
    } catch (err) {
        next(err);
    }
}

//GET ALL
export const getBuses = async (req,res,next) => {
    try {
        const buses = await Bus.find()
        res.status(200).json(buses);
    } catch (err) {
        next(err);
    }
}