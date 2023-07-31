const express = require('express');
const dbConnect=require('./config/dbConnect');
const dotenv = require("dotenv");
const companyModel = require('./Model/companyModel');
const trainModel = require('./Model/TrainModel')
const app = express();
dotenv.config();
app.use(express.json());
// database Connection
dbConnect();

// routes

// registeration for companies

app.post('/train/register',async(req,res)=>{
        const checkAlreadyRegister= await companyModel.find(req.body.rollNo);
        if(checkAlreadyRegister.length==0){
                const createCompany = await companyModel.create(req.body);
                return res.json({
                        companyData:createCompany,
                        message:"New Resource Created"
                })
        }
        else {
                return res.json({
                  message: "Resource Alredy Registered"
                });
        }
})


// get  Train
app.get('/train/trains',async (req,res)=>{
        const trains=await trainModel.find();
        return res.json({
                Trains:trains,
                message:"Success"
        })
})
app.listen(3000,()=>{
        console.log("Server is Running");
})