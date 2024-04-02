import express from "express";
import  User  from "../models/user.js";
import packageagency from "../models/package.js";
const router= express.Router()

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





export default router