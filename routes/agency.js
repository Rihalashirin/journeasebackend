import express, { response } from "express";
import packageagency from "../models/package.js";
import  User  from "../models/user.js";
import { upload } from '../multer.js'
import adventureagency from "../models/adventure.js";
import room from "../models/room.js";
import Facility from "../models/facilities.js";
// import destinationadd from "../models/destination.js";
import guiderequest from "../models/requestguide.js";

import mongoose from "mongoose";
import booking from "../models/booking.js";
import resortenquire from "../models/resort.js";

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
router.put('/adventureupdate/:id', upload.single('image'), async (req, res) => {
    try {
        const adventureId = req.params.id;
        const updatedData = { ...req.body };
        
        // Check if there's an image file uploaded
        if (req.file) {
            console.log(req.file);
            updatedData.image = req.file.filename;
        }
        
        const updatedAdventure = await adventureagency.findByIdAndUpdate(adventureId, updatedData, { new: true });
        
        if (!updatedAdventure) {
            return res.status(404).json({ success: false, message: 'Adventure not found' });
        }
        
        res.json({ message: 'Adventure updated', data: updatedAdventure });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// router.post('/adddestination',async(req,res)=>{
//     try{

//     console.log(req.body);
//     const newDestination = new destinationadd(req.body)
//     const savedDestination = await newDestination.save()
//     res.json({message:"issue created",savedDestination})
// }
// catch(e){
//     res.json(e.message)
// }
// })




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

router.post('/enquireresort',async(req,res)=>{
    try{
            
        console.log(req.body)
        const newRequestresort= new resortenquire(req.body)
        const savedRequestresort= await newRequestresort.save()
        res.json({message: "enquire resort",savedRequestresort})
    }
    catch(e){
        res.json(e.message)

    }

    
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
       try{
    let id=req.params.id
        console.log(req.files);
        if(req.files['licenseProof']){
            
            let coverimage =req.files['licenseProof'][0].filename
            console.log(coverimage);
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
        // console.log(response);
    }
    catch(e){
        res.json(e.message)
    }
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
router.post('/enquireguide',async(req,res)=>{
    try{
        let id=req.params.id    
        console.log(req.body)
        const newRequestguide= new guiderequest(req.body)
        const savedRequestguide= await newRequestguide.save()
        res.json({message: "enquire guide",savedRequestguide})
    }
    catch(e){
        res.json(e.message)

    }

    
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
        res.json(response)
    }
    catch(e){
        res.json(e)
    }



})


// router.put('/addresortToPackage/:id',async (req,res)=>{
//     try{
//     console.log(req.body);
//     let id=req.params.id;
//     let updatedPackage=await packageagency.findByIdAndUpdate(id,
//         { $push: { resortId: { $each: req.body.resortId } } },
//         { new: true }
//         );
//         console.log(updatedPackage);
//         res.json(updatedPackage);
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.put('/addresortToPackage/:id', async (req, res) => {
    try {
        console.log(req.body);
        
        // Extract ID from URL parameters
        let id = req.params.id;
        
        // Update the document in the database
        let updatedPackage = await packageagency.findByIdAndUpdate(
            id,
            { $addToSet: { resortId: { $each: req.body.resortId } } },
            { new: true }
        );
        
        console.log(updatedPackage);
        res.json(updatedPackage);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

   
    router.put('/addAdventuretoPackage/:id', async (req, res) => {
        try {
            console.log(req.body, '===================');
            
            // Extract ID from URL parameters
            let id = req.params.id;
            
            // Update the document in the database
            let updatedPackage = await packageagency.findByIdAndUpdate(
                id,
                { $addToSet: { adventureid: { $each: req.body.adventureid } } },
                { new: true }
            );
            
            // Log the updated document
            console.log(updatedPackage);
            
            // Send the updated document as response
            res.json(updatedPackage);
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    

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

    router.get('/viewPackageAdventure/:id',async(req,res)=>{
        try{
        let id=req.params.id
        console.log(req.body)
        let response=await packageagency.findById(id)
        console.log(response,'sda');
        let responseData=[]
        for (let x of response.adventureid){

            let myresorts=await adventureagency.findById(x)
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
    router.put('/assignhealth/:id',async(req,res)=>{
        let id=req.params.id
        console.log(id);
        console.log(req.body);
        let response=await booking.findByIdAndUpdate(id,req.body)
        console.log(response);
        res.json(response)
    })

    // router.post('/guiderequest',async(req,res)=>{
    //     try{
    //         let id=req.params.id
    //         console.log(req.body)
    //         const newguiderequest= new guiderequest(req.body)
    //         const savedguiderequest=await newguiderequest.save();
    //         res.json({message:"guide request",savedguiderequest})
    //     }
    //     catch(e){
    //         res.json(e.message)
    //     }
    // })
    router.get('/vwbookingtable/:id',async(req,res)=>{
        try{
            let id=req.params.id
            console.log(id)
            let response=await packageagency.find({agencyid:id})
            console.log(response,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
            let responseData=[];
            for(const newresponse of response){
                let bookings=await booking.find({packageid:newresponse._id})
                for(const b of bookings){
                    let user=await User.findById(b.userId)
                    console.log(bookings,'rrrrrrrrrrrrrrrrrrrrrrrr');
                    responseData.push({
                        booking:b,
                        req:newresponse,
                        user:user
                    })
                }
            }
            console.log(responseData)
            res.json(responseData)
        
        }
        catch(e){
            console.log(e);
            res.json(e.message)
        
        }
        })

        router.get('/vwdetailbooking/:id', async (req, res) => {
            try {
                let id = req.params.id;
                console.log(id);
                let response = await booking.findById(id);
        
                console.log(response);
        
                let user = await User.findById(response.userId);
                let packageDetail = await packageagency.findById(response.packageid);
        
                let adventures = [];
                for (const ad of response.adventureId) {
                    let adventure = await adventureagency.findById(ad);
                    adventures.push(adventure);
                }
        
                let resorts = [];
                for (const re of response.resortId) {
                    let resort = await User.findById(re);
                    resorts.push(resort);
                }
        
                let responseData = {
                    user: user,
                    package: packageDetail,
                    adventures: adventures,
                    resorts: resorts,
                    booking: response
                };
        
                res.json(responseData);
            } catch (e) {
                res.json(e.message);
            }
        });
        

        router.put('/managebooking/:id',async(req,res)=>{
            let id=req.params.id
            console.log(id);
            console.log(req.body);
            let response=await booking.findByIdAndUpdate(id,req.body)
            console.log(response);
        })

        // router.put('/assignhealth/:id',async(req,res)=>{
        //     let id=req.params.id
        //     console.log(id);
        //     let response=await booking.findOneAndUpdate(id,req.body)
        //     console.log(response);
        // })


export default router