import express from "express";
import packageagency from "../models/package.js";
import { User } from "../models/user.js";
import { upload } from '../multer.js'
import adventureagency from "../models/adventure.js";
import room from "../models/room.js";

const router=express.Router()

router.post('/package',upload.fields([{name: 'coverImage'},{name:'uploadBrochure'}]),async(req,res)=>{

    try{

        if(req.files['coverImage']){
            
            let coverimage =req.files['coverImage'][0].filename
            req.body={...req.body,coverImage:coverimage}
        }
        if(req.files['uploadBrochure']){

            let brochure =  req.files['uploadBrochure'][0].filename 
           
            req.body={...req.body,uploadBrochure:brochure}
        }
       
        console.log(req.body);
        const newPackage = new packageagency(req.body)
        const savedPackage = await newPackage.save()
        res.json({message:"package created",data:savedPackage})
    }
    catch(e){
        res.json(e.message)
    }   

})



router.get('/findresort',async(req,res)=>{
    let response=await User.find({userType:'resort'})
    res.json(response)
    console.log(response)
})
router.get('/vwpkgagency/:id',async(req,res)=>{
    try{

        let id=req.params.id
        let response=await packageagency.find({agencyid:id})
        console.log(response);
        res.json(response)
    }
    catch(e){
        res.json(e)
    }

    
})
router.get('/vwagencyprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
    })
router.put('/agencyeditprofile/:id',upload.fields([{ name: 'licenseProof'}, { name: 'companyLogo'},{name:'idProof'},{name:'image'},{name:'coverImage'}]),async(req,res)=>{
        let id=req.params.id
        console.log(req.files);
        if(req.files['licenseProof']){
            
            let coverimage =req.files['licenseProof'][0].filename
            req.body={...req.body,coverImage:coverimage}
        }
        if(req.files['companyLogo']){

            let brochure =  req.files['companyLogo'][0].filename 
           
            req.body={...req.body,uploadBrochure:brochure}
        }
        if(req.files['idProof']){

            let proof =  req.files['idProof'][0].filename 
           
            req.body={...req.body,idProof:proof}
        }
        if(req.files['image']){

            let image =  req.files['image'][0].filename 
           
            req.body={...req.body,image:image}
        }
        if(req.files['coverImage']){

            let coverimage =  req.files['coverImage'][0].filename 
           
            req.body={...req.body,coverImage:coverimage}
        }

        let response=await User.findByIdAndUpdate(id,req.body)
        console.log(response);
    })
    
router.post('/adventureadd',async(req,res)=>{
    console.log(req.body);
    const newPackage = new adventureagency(req.body)
    const savedPackage = await newPackage.save()
    res.json({message:"adventure created",data:savedPackage})

})
router.get('/findadventure',async(req,res)=>{
    let response=await  adventureagency.find()
    res.json(response)
    console.log(response)
})

router.get('/findguide',async(req,res)=>{
    console.log(req.body)
    let response=await User.find()
    console.log(response)
    res.json(response)
})
router.get('/detailguide/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.body)
    let response=await User.findById(id)
    console.log(response)
    res.json(response)

})


export default router