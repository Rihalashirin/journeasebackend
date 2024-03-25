import express from "express";
import mongoose from "mongoose";
import cors from 'cors'



import userRouter from './routes/user.js'
import resortRouter from './routes/resort.js'
import agencyRouter from './routes/agency.js'


const app=express()
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/journease')
  .then(() => console.log('Connected!'));

// api
app.use('/uploads', express.static('uploads'));


app.use('/user',userRouter)  
app.use('/resort',resortRouter)
app.use('/agency',agencyRouter)


app.listen(4000)