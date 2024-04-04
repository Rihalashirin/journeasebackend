import express from "express";
import  User  from "../models/user.js";
const router= express.Router()
import { upload } from '../multer.js'
import packageagency from "../models/package.js";
import booking from "../models/booking.js";
import room from "../models/room.js";
import adventureagency from "../models/adventure.js";



router.post('/registration',upload.fields([{name:'idProof'},{name:'licenseProof'},{name:'image'},{name:'coverImage'},{name:'companyLogo'}]), async(req,res)=>{
    try{

        if(req.files['idProof']){
            
            let idproof =req.files['idProof'][0].filename
            req.body={...req.body,idProof:idproof}
        }
        if(req.files['licenseProof']){

            let liscence =  req.files['licenseProof'][0].filename 
           
            req.body={...req.body,licenseProof:liscence}
        }
        if(req.files['image']){
            let image = req.files['image'][0].filename
            req.body={...req.body,image:image}
        }
        if(req.files['coverImage']){
            let coverimage = req.files['coverImage'][0].filename
            req.body={...req.body,coverImage:coverimage}
        }
        if(req.files['companyLogo']){
            let logo = req.files['companyLogo'][0].filename
            req.body={...req.body,companyLogo:logo}
        }
        console.log(req.body);
        const newUser = new User(req.body)
        console.log(newUser);
        const savedUser = await newUser.save()
        res.json({message:"user created",data:savedUser})
    }
    catch(e){
        res.json(e.message)
    }
    

    
})
// router.post('/login',async(req,res)=>{
//     console.log(req.body);
//     let users=await User.findOne(req.body)
//     console.log(users);
//     res.json(users)
// })
router.post('/login',async(req,res)=>{
    console.log(req.body);
    let user=await User.findOne(req.body)
    console.log(user);
    res.json(user)
})



router.get('/findpackage',async(req,res)=>{
    let pkgagency=await packageagency.find()
    console.log(pkgagency,'pkgagency');
    let responseData=[]
 for (let x of pkgagency){
    let Agencies=await User.findById(x.agencyid)
    responseData.push({
        package:x,
        agency:Agencies
    })
 }
    res.json(responseData)
})

router.get('/detailvwpackage/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await packageagency.findById(id)
    let agency=await User.findById(response.agencyid)
    res.json({response,agency})
    console.log(response);
})

router.get('/detailvwagency/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)

    console.log(response);
    res.json(response) 
})



router.get('/vwaccomodation/:id',async(req,res)=>{
    let id=req.params.id

    console.log(id)
    let responseData=[]
    let pkgagency=await packageagency.findById(id)
    for (let x of pkgagency.resortId){
       let resort=await User.findById(x)
       responseData.push({
           package:x,
           resort:resort
       })
    }
       res.json(responseData)
   

})
// router.get('/detailvwresort/:id',async(req,res)=>{
//     let id=req.params.id
//     console.log(id)
//     let response=await User.findById(id)
//     let rooms=await room.find({resortid: response._id})
//     let facilities=await Facility.find({resortid:response._id})
//     res.json({response,rooms,facilities})
//     console.log(response)
// })

router.post('/booking',async(req,res)=>{
    try{
     let id=req.params.id
    console.log(req.body,"=======");

    let newbooking= await booking(req.body)
    const savedBooking = await newbooking.save()
  
    res.json({message:"issue created",savedBooking})
}
catch(e){
    res.json(e.message)
}
})


router.get('/vwadventure/:id',async(req,res)=>{
    
    let id=req.params.id

    console.log(id)
    let responseData=[]
    let pkgagency=await packageagency.findById(id)
    console.log(pkgagency,'=====================');
    for (let x of pkgagency.adventureid){
       let agency=await adventureagency.findById(x)
       responseData.push({
           package:x,
           agency:agency
       })
    }
       res.json(responseData)
})
router.get('/vwmybookingtable/:id',async(req,res)=>{
try{
    let id=req.params.id
    console.log(id)
    let response=await booking.find({userId:id})
    console.log(response,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    let responseData=[];
    for(const newresponse of response){
        let package1=await packageagency.findById(newresponse.packageid)
        console.log(package1,'rrrrrrrrrrrrrrrrrrrrrrrr');
        responseData.push({
            package1:package1,
            req:newresponse
        })
    }
    console.log(responseData)
    res.json(responseData)

}
catch(e){
    res.json(e.message)

}
})
router.get('/viewbookigdetail/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await booking.findById(id)
    console.log(response)
    let package1=await packageagency.findById(response.packageid)
    let resort=await User.findById(response.resortId)
    let adv=await adventureagency.findById(response.adventureId)
    res.json({response,package1,resort,adv})
})


export default router