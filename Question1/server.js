const express = require('express');
const dbConnect=require('./config/dbConnect');
const dotenv = require("dotenv");
const companyModel = require('./Model/companyModel');
const trainModel = require('./Model/TrainModel');
const genearateToken = require('./utils/generateToken');
const authMiddleWare = require('./middleware/authMiddleware');
const app = express();
dotenv.config();
app.use(express.json());
// database Connection
dbConnect();

// routes

// registeration for companies

app.post('/train/register',async(req,res)=>{
        const checkAlreadyRegister= await companyModel.find({rollNo:req.body.rollNo});
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

// register Auth

app.post("/train/register/auth",async (req,res)=>{
        const company = await companyModel.find({ rollNo: req.body.rollNo });
        if(company){
                return res.json({
                        message:"already Registered"
                })
        }
        else{
                const createCompany = await companyModel.create(req.body);
                res.status(200);
                res.json({
                        tokenType:"Bearer",
                        access_token:genearateToken(company._id)
                })
        }
});

// get  Train
app.get('/train/trains',authMiddleWare,async (req,res)=>{
        const trains=await trainModel.find();
        return res.json({
                Trains:trains,
                message:"Success"
        })
})

// get Train With Number

app.get("/train/trains/:Number", authMiddleWare, async (req, res) => {
  const train = await trainModel.findOne(req.params.Number);
  return res.json(train);
});

app.listen(3000,()=>{
        console.log("Server is Running");
})