import express from "express";
import mongoose from "mongoose";
import cors from 'cors'


import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import resortRouter from './routes/resort.js'
import agencyRouter from './routes/agency.js'
import guideRouter from './routes/guide.js'


const app=express()
app.use(cors());
app.use(express.json({limit:"50mb"}));

mongoose.connect('mongodb+srv://rihala345:3WneQ26XWraWHHSs@cluster0.vdvpqxw.mongodb.net/journease')
  .then(() => console.log('Connected!'));

// api
app.use('/uploads', express.static('uploads'));


app.use('/user',userRouter)  
app.use('/resort',resortRouter)
app.use('/agency',agencyRouter)
app.use('/guide',guideRouter)
app.use('/admin',adminRouter)


app.listen(4000)