const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const company=mongoose.Schema({
        companyName:String,
        ownerName:String,
        rollNo:Number,
        ownerMailId:String,
        accessCode:{
                type:String,
                require:true,
        }
})
const companyModel=mongoose.model("company",company);
module.exports=companyModel;