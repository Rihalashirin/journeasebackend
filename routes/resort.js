import express from "express";
import Facility from "../models/facilities.js";
import User  from "../models/user.js";
import room from "../models/room.js";
import { upload } from "../multer.js";
import resortenquire from "../models/resort.js";
import booking from "../models/booking.js";
import packageagency from "../models/package.js";
import adventureagency from "../models/adventure.js";
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
    router.get('/vwrequestagency/:id',async(req,res)=>{
        let id= req.params.id
        console.log(req.body)
        let response= await resortenquire.find({resortid:id})
        console.log(response)
        let responseData=[]
        for(const newresponse of response) {
            let bookings=await booking.findById(newresponse.bookingid);
            console.log(bookings);
    
          if(bookings){
    
              let pkg=await packageagency.findById(bookings.packageid);
              console.log(pkg);
              let agnc=await User.findById(pkg?.agencyid)
              console.log(agnc);
              responseData.push({
                bookings:bookings,
                req:newresponse,
                agn:agnc,
                pkg:pkg
             } )
            }
    
    
    
            
        }
        console.log(responseData)
        res.json(responseData)
    })
    router.get('/vwdetailbooking/:id', async(req,res)=>{
        let id=req.params.id
        console.log(id);
        let response=await resortenquire.findById(id)
        if(response){
            let bookings=await booking.findById(response.bookingid)
            let usr=await User.findById(bookings.userId)
        let package1=await packageagency.findById(bookings.packageid)
        let resort=await User.findById(bookings.resortId)
        let adv=await adventureagency.findById(bookings.adventureId)
        // let user=await User.findById(bookings.userId)
        // responseData.push({
        //     bookings:bookings,
        //     req:response,
        //     resorts:resort,
        //     pkg:package1,
        //     adv:adv
        //  } )
        res.json({response,bookings,usr,package1,resort,adv})
    }
    })
    router.put('/managebooking/:id',async(req,res)=>{
        let id=req.params.id
        console.log(id);
        console.log(req.body);
        let response=await resortenquire.findByIdAndUpdate(id,req.body)
        if(response){

            let response2=await booking.findByIdAndUpdate(response.bookingid,req.body)
            console.log(response,response2);
        }
        console.log(response);
        res.json(response)
    })

export default router