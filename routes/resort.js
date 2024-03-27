import express from "express";
import Facility from "../models/facilities.js";
import { User } from "../models/user.js";
const router=express()

router.post('/facilities',async(req,res)=>{
    console.log(req.body);
    let newdata=new Facility({gym:req.body})
    console.log(newdata);
    let response=newdata.save()
    res.json(response)
    
})

router.post('/room',async(req,res)=>{
    console.log(req.body);
    const newRoom = new room(req.body)
    const savedPackage = await newRoom.save()
    res.json({message:"package created",data:savedPackage})
}
)


router.get('/resortviewprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
    })
router.put('/resorteditprofile/:id',async(req,res)=>{
        let id=req.params.id
        console.log(req.body);
        let response=await User.findByIdAndUpdate(id,req.body)
        console.log(response);
    })
export default router