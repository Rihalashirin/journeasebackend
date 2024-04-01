import express, { response } from "express";
import packageagency from "../models/package.js";
import  User  from "../models/user.js";
import { upload } from '../multer.js'
import adventureagency from "../models/adventure.js";
import room from "../models/room.js";
import Facility from "../models/facilities.js";

const router=express.Router()

router.post('/package', upload.fields([{ name: 'coverImage' }, { name: 'uploadBrochure' }]), async (req, res) => {
    try {
        let packageData = { ...req.body }; // Copy req.body to packageData

        console.log("Req Body:", req.body); // Log request body for debugging
        
        if (req.files['coverImage']) {
            const coverimage = req.files['coverImage'][0].filename;
            packageData.coverImage = coverimage; // Add coverImage to packageData
        }
        if (req.files['uploadBrochure']) {
            const brochure = req.files['uploadBrochure'][0].filename;
            packageData.uploadBrochure = brochure; // Add uploadBrochure to packageData
        }

        console.log("Package Data:", packageData); // Log packageData for debugging

        const newPackage = new packageagency(packageData); // Use packageData for creating newPackage
        const savedPackage = await newPackage.save();
        console.log("Saved Package:", savedPackage); // Log saved package for debugging
        res.json({ message: "package created", data: savedPackage });
    } catch (e) {
        console.error("Error:", e); // Log any errors for debugging
        res.status(500).json({ error: e.message });
    }
});

router.post('/adventureadd',upload.single('image'),async(req,res)=>{
    console.log(req.file);
    let imagepath=req.file.filename
    const newPackage = new adventureagency({...req.body,image:imagepath})
    const savedPackage = await newPackage.save()
    res.json({message:"adventure created",data:savedPackage})

})



router.get('/findresort',async(req,res)=>{
    let response=await User.find({userType:'resort'})
    res.json(response)
    console.log(response)
})
router.get('/detailvwresort/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let response=await User.findById(id)
    let rooms=await room.find({resortid: response._id})
    let facilities=await Facility.find({resortid:response._id})

    res.json({response,rooms,facilities})
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

router.get('/detailvwpkg/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    let response=await packageagency.findById(id)
    res.json(response)
    console.log(response);
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
    

router.get('/findadventure',async(req,res)=>{
    console.log(req.body)
    let response=await  adventureagency.find()
    console.log(response)
    res.json(response)
    
})

router.get('/findguide',async(req,res)=>{
    console.log(req.body)
    let response=await User.find()
    console.log(response)
    res.json(response)
})
router.get('/detailguide/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body)
    let response=await User.findById(id)
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e)
    }
})
router.post('enquireguide',async(req,res)=>{
    console.log(req.body)
    
})
router.put('/editpackage/:id',upload.fields([{name:'coverImage'}]),async(req,res)=>{
    try{
        if(req.files['coverImage']){
            const img = req.files['coverImage'][0].filename;
            console.log(img)
            req.body={...req.body,coverImage:img}
        }
        let id=req.params.id
        console.log(req.body)
        let response=await packageagency.findByIdAndUpdate(id,req.body)
        console.log(response)
    }
    catch(e){
        res.json(e)
    }



})

router.put('/addresortToPackage/:id',async (req,res)=>{
    console.log(req.body);
    let id=req.params.id
    let response=await packageagency.findByIdAndUpdate(id,req.body)
    console.log(response);


    })
router.put('/addAdventuretoPackage/:id',async(req,res)=>{
    console.log(req.body);
    let id=req.params.id
    let response=await adventureagency.findByIdAndUpdate(id,req.body)
    console.log(response)
})

    router.get('/viewPackageResort/:id',async(req,res)=>{
        try{
        let id=req.params.id
        console.log(req.body)
        let response=await packageagency.findById(id)
        console.log(response,'sda');
        let responseData=[]
        for (let x of response.resortId){

            let myresorts=await User.findById(x)
            console.log(myresorts);
            responseData.push({
                resorts:myresorts
            })
            
        }
        // console.log(response)
        res.json(responseData)
        }
        catch(e){
            res.json(e)
        }
    })

export default router