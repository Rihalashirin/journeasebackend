import express from "express";
import  User  from "../models/user.js";
import imagesguide from "../models/image.js";
import { upload } from "../multer.js";
import Issue from "../models/issues.js";
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
router.post('/addissue ',async(req,res)=>{
    try{
    console.log(req.body);
    const newIssue = new Issue (req.body)
    const savedIssue = await newIssue.save()
    res.json({message:"issue created",savedIssue})
}
catch(e){
    res.json(e.message)
}
})
router.get('/vwimageguide/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await imagesguide.findById(id)
    console.log(response);
    res.json(response)
    

})
export default router