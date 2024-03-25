import express from "express";
import packageagency from "../models/package.js";
import { User } from "../models/user.js";
import { upload } from '../multer.js'

const router=express.Router()

router.post('/package',async(req,res)=>{
        console.log(req.body);
        const newPackage = new packageagency(req.body)
        const savedPackage = await newPackage.save()
        res.json({message:"package created",data:savedPackage})
        

})
router.get('/findresort',async(req,res)=>{
    let response=await User.find({userType:'resort'})
    res.json(response)
    console.log(response)
})
router.get('/vwpkgagency',async(req,res)=>{
    let response=await packageagency.find({userType:'agency'})
    res.json(response)
    console.log(response)
    
})
router.get('/vwagencyprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
    })
router.put('/agencyeditprofile/:id',upload.fields([{ name: 'licenseProof', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]),async(req,res)=>{
        let id=req.params.id
        console.log(req.files);
        let response=await User.findByIdAndUpdate(id,req.body)
        console.log(response);
    })


export default router