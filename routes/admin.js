import express from "express";
import  User  from "../models/user.js";
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
router.put('/manageagency/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);
})




export default router