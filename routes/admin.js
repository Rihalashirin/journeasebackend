import express from "express";
import  User  from "../models/user.js";
const router= express.Router()
router.get('/mngagency',async(req,res)=>{
    console.log(req.body);
    let mngagency=await User.find({userType:'agency'})
    console.log(mngagency);
    res.json(mngagency)

})
router.get('/acceptagency/:id',async(req,res)=>{
    let id=req.params.id
    let acceptagency=await User.findById(id)
    console.log(acceptagency);
    res.json(acceptagency)

})
router.get('/vwbooking/:id',async(req,res)=>{
    let id=req.params.id
    let acceptagency=await User.findById(id)
    console.log(acceptagency);
    res.json(acceptagency)

})



export default router