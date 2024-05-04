import express from "express";
import  User  from "../models/user.js";
import packageagency from "../models/package.js";
import booking from "../models/booking.js";
import reviewuser from "../models/review.js";
import reviewresorts from "../models/resortreview.js";
import nodemailer from 'nodemailer'
const router=express()




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'journeaseproject@gmail.com',
    pass: 'uqzi zaaj ndxn psek',
  },
});

router.post('/sendOTP', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: 'journeaseproject@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'OTP sent successfully',otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ error: 'Failed to send OTP' });
  }
});
router.put('/changepass/:email',async(req,res)=>{
    let email=req.params.email
    let response=await User.findOne({email:email})
    console.log(response);
    let response1=await User.findByIdAndUpdate(response._id, req.body,{new:true})
    console.log(req.body); 
    console.log(response1);
})

router.get('/vwagency',async(req,res)=>{
    let vwagency=await User.find({userType:'agency'})
    console.log(vwagency);
    res.json(vwagency);
})
router.get('/detailvwagency/:id',async(req,res)=>{
    let id=req.params.id
    let viewagency=await User.findById(id)
    console.log(viewagency);
    res.json(viewagency)

})
router.get('/vwguide',async(req,res)=>{
    let vwguide=await User.find({userType:'guide'})
    console.log(vwguide);
    res.json(vwguide);
})

router.get('/detailvwguide/:id',async(req,res)=>{
    let id=req.params.id
    let viewguide=await User.findById(id)
    console.log(viewguide);
    res.json(viewguide)

})
router.get('/vwresort',async(req,res)=>{
    let vwresort=await User.find({userType:'resort'})
    console.log(vwresort);
    res.json(vwresort);
})
router.get('/detailvwresort/:id',async(req,res)=>{
    let id=req.params.id
    let viewresort=await User.findById(id)
    console.log(viewresort);
    res.json(viewresort)

})

router.put('/manageagency/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);
})
router.get('/vwpackage',async(req,res)=>{
    let response=await packageagency.find()
    // let agency =await User.findById(response.agencyid)
    // console.log(response);
    // res.json({response,agency});
    let responseData=[];
    for(const newresponse of response){
        let agency=await User.findById(newresponse.agencyid);
        responseData.push({
            agency:agency,package:newresponse
        });
    }
    res.json(responseData);
})
router.get('/vwbooking',async(req,res)=>{
    let response=await booking.find()
    console.log(response);  
    
    // let agency =await User.findById(response.agencyid)
    // console.log(response);
    // res.json({response,agency});
    let responseData=[];
    for(const newresponse of response){
        let user=await User.findById(newresponse.userId);
        let pkg=await packageagency.findById(newresponse.packageid);
        let resort=await User.findById(newresponse.resortId)
        let agency=await User.findById(pkg?.agencyid);
        let rw=await reviewuser.find({bookingid:newresponse._id})
        let resrw=await reviewresorts.find({bookingid:newresponse._id})

        responseData.push({
            agency:agency,
            package:pkg,
            user:user,
            req:newresponse,
            rw:rw,
            resrw:resrw,
            resort:resort
        });
    }
    res.json(responseData);
})






export default router