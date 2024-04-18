import express from "express";
import  User  from "../models/user.js";
import imagesguide from "../models/image.js";
import { upload } from "../multer.js";
import Issue from "../models/issues.js";
import guiderequest from "../models/requestguide.js";
import booking from "../models/booking.js";
import packageagency from "../models/package.js";
import adventureagency from "../models/adventure.js";
const router=express()

router.get('/guideviewprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
    })
router.put('/guideeditprofile/:id',async(req,res)=>{
        let id=req.params.id
        console.log(req.body);
        let response=await User.findByIdAndUpdate(id,req.body)
        console.log(response);
    })
router.post('/addimage',upload.single('images'), async(req,res)=>{
    console.log(req.file);
    let imagepath = req.file.filename
    const newAddimage= new imagesguide({...req.body,images:imagepath})
    const savedImage=await newAddimage.save()
    res.json({message:"image added",savedImage})
})
router.post('/addissue',async(req,res)=>{
    try{
        let id=req.params.id
    console.log(req.body);
    const newIssue = new Issue(req.body)
    const savedIssue = await newIssue.save()
    res.json({message:"issue created",savedIssue})
}
catch(e){
    res.json(e.message)
}
})
router.get('/vwfeedback/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Issue.findOne({bookingid:id})
    console.log(response);
    res.json(response)
    

})

router.get('/vwimageguide/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await imagesguide.find({bookingid:id})
    console.log(response);
    res.json(response)
    

})
router.get('/vwrequestagency/:id',async(req,res)=>{
    let id= req.params.id
    console.log(req.body)
    let response= await guiderequest.find({guideid:id})
    console.log(response,'rrrrrrrrrrrrrrrrrrrrrrrrr')
    let responseData=[]
    for(const newresponse of response) {
        let bookings=await booking.findById(newresponse.bookingid);
        console.log(bookings,'bbbbbbbbbbbbbbbbbbbbbbbbbbbb');

      if(bookings){

          let pkg=await packageagency.findById(bookings.packageid);
          console.log(pkg,'ppppppppppppppp');
          let agnc=await User.findById(pkg.agencyid)
          console.log(agnc,'aaaaaaaaaaaaaaaaaaaaaaaaaaa');
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
    let response=await guiderequest.findById(id)
    console.log(response)
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
router.put('/enterwage',async(req,res)=>{
    let id=req.params.id
    console.log(req.body);
    let response=await booking.findByIdAndUpdate(id,req.body)
    console.log(response);
})


router.put('/managebooking/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await guiderequest.findByIdAndUpdate(id,req.body)
    if(response){

        let response2=await booking.findByIdAndUpdate(response.bookingid,req.body)
        console.log(response,response2);
    }
})


export default router