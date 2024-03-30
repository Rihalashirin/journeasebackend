import express from "express";
import Facility from "../models/facilities.js";
import { User } from "../models/user.js";
import room from "../models/room.js";
import { upload } from "../multer.js";
const router=express()

router.post('/facilities',async(req,res)=>{
    console.log(req.body);
    let newdata=new Facility(req.body)
    console.log(newdata);
    let response=newdata.save()
    res.json(response)
    
})

router.post('/room',upload.fields([{name: 'image'},{name:'images'}]),async(req,res)=>{
    try{
let rooms=await room.findOne({resortid:req.body.resortid})
if(rooms){
    return res.json('already added')
}
        if(req.files['image']){
            
            let image =req.files['image'][0].filename
            req.body={...req.body,image:image}
        }
        if(req.files['images']){

            let images =  req.files['images'][0].filename 
           
            req.body={...req.body,images:images}
        }
    console.log(req.body);
    const newRoom = new room(req.body)
    const savedPackage = await newRoom.save()
    res.json({message:"package created",data:savedPackage})
}
catch(e){
    res.json(e.message)
}  
})

router.get('/viewroom/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await room.findOne({resortid:id})
    console.log(response)
    res.json(response)
})


router.put('/editroom/:id',upload.fields([{name:'image'},{name:'images'}]),async(req,res)=>{
   try{
    if(req.files['image']){
            
        let image =req.files['image'][0].filename
        req.body={...req.body,image:image}
    }
    if(req.files['images']){

        let images =  req.files['images'][0].filename 
       
        req.body={...req.body,images:images}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await room.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
} 

})
router.get('/viewfacilityresort/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Facility.find({resortid:id})
    console.log(response);
    res.json(response)
    })



    router.get('/viewfacility/:id',async(req,res)=>{
        let id=req.params.id
        console.log(id);
        let response=await Facility.find({resortid:id})
        console.log(response);
        res.json(response)
        })
    router.put('/editfacility/:id',async(req,res)=>{
        let id=req.params.id
        console.log(req.body)
        let response=await Facility.findByIdAndUpdate(id,req.body) 
        res.json(response)

    })

export default router