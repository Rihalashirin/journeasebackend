import express from "express";
import  User  from "../models/user.js";
const router= express.Router()
import { upload } from '../multer.js'
import packageagency from "../models/package.js";



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
router.get('/vwaccomodation',async(req,res)=>{
    
})


router.get('/findadventure',async(req,res)=>{
    
    console.log(response)
})


export default router