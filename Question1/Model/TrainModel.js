const mongoose = require("mongoose");

const train = mongoose.Schema({
        trainName:String,
        trainNumber:Number,
        departureTime:{
                Hours:Number,
                Minutes:Number,
                Seconds:Number
        },
        seatsAvailable:{
                sleeper:Number,
                AC:Number
        },
        price:{
                Sleeper:Number,
                AC:Number
        },
        delayedBy:Number
});
const trainModel=mongoose.model("Train",train);
module.exports=trainModel;
