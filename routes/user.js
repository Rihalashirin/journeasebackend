import express, { response } from "express";
import  User  from "../models/user.js";
const router= express.Router()
import { upload } from '../multer.js'
import packageagency from "../models/package.js";
import booking from "../models/booking.js";
import room from "../models/room.js";
import adventureagency from "../models/adventure.js";
import reviewuser from "../models/review.js";
import resortenquire from "../models/resort.js";
import guiderequest from "../models/requestguide.js";



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
        const existMail=await User.findOne({email:req.body.email})
        if (existMail){
            return res.status(400).json({message:'mail exist'})
        }
        if(req.body.licenseNumber){

            const existlicense=await User.findOne({licenseNumber:req.body.licenseNumber})
            if (existlicense){
                return res.status(400).json({message:'licensenumber exist'})
            }
        }
        const existphonenumber=await User.findOne({contactNumber:req.body.contactNumber})
        if (existphonenumber){
            return res.status(400).json({message:'contactnumber exist'})
        }
        if(req.body.registrationNumber){

        const existregisternumber=await User.findOne({registrationNumber:req.body.registrationNumber})
        if (existregisternumber){
            return res.status(400).json({message:'registraionNumber exist'})
        }
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
router.post('/api/auth/authenticate',async (req,res)=>{
    console.log(req.body);
    let response=await  User.findOne(req.body)
    console.log(response);
    res.json(response)
})



router.get('/findpackage',async(req,res)=>{
    let pkgagency=await packageagency.find()
    console.log(pkgagency,'pkgagency');
    let responseData=[]
 for (let x of pkgagency){
    let Agencies=await User.findById(x.agencyid)
    let adv=await adventureagency.findById(x.adventureid)
    responseData.push({
        package:x,
        agency:Agencies,
        adv:adv
    })
 }
    res.json(responseData)
})

router.get('/detailvwpackage/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await packageagency.findById(id)
    let agency=await User.findById(response.agencyid)
    let defaulthotel=await User.findById(response.defaulthotelId)
    let responseData=[]
    for (const x of response.defaultadventureId)   {
        let adventuredefault=await adventureagency.findById(x)
        responseData.push({
            pkg:response,
            defaultadventure:adventuredefault,
            agency:agency,
            defaulthotel:defaulthotel
        })
       
    
    }
    
    console.log(responseData);
    res.json(responseData)
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
        let agnc=await User.findById(package1.agencyid)
        console.log(package1,'rrrrrrrrrrrrrrrrrrrrrrrr');
        responseData.push({
            package1:package1,
            agnc:agnc,
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
    let packageDetail = await packageagency.findById(response.packageid);

    let adventures = [];
                for (const ad of response.adventureId) {
                    let adventure = await adventureagency.findById(ad);
                    adventures.push(adventure);
                }
        
                let resorts = [];
                for (const re of response.resortId) {
                    let resort = await User.findById(re);
                    let rooms=await room.findOne({resortid:resort._id})
                    resorts.push({resort,rooms});
                }
        
                let responseData = {
                    package: packageDetail,
                    adventures: adventures,
                    resorts: resorts,
                    booking: response
                };
        
                res.json(responseData);
})

router.post('/addreview',async(req,res)=>{
  try{
    console.log(req.body,'..................');
    const newReview = new reviewuser(req.body)
    const savedReview = await newReview.save()
    console.log(savedReview);
    res.json({message:"review created",savedReview})
}

  

catch(e){
    res.json(e.message)

}

})
router.post('/addresortreview',async(req,res)=>{
    try{
      console.log(req.body,'..................');
      const newReview = new reviewuser(req.body)
      const savedReview = await newReview.save()
      console.log(savedReview);
      res.json({message:"review created",savedReview})
  }
  
    
  
  catch(e){
      res.json(e.message)
  
  }
  
  })

router.get('/vwpkgname/:id',async(req,res)=>{
    let id=req.params.id
    let response=await booking.findById(id)
    let pkg=await packageagency.findById(response.packageid);
    let agnc=await User.findById(pkg.agencyid);
    console.log(response)
    res.json({response,pkg,agnc})
})
router.get('/vwnotification/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(id)
        let response=await booking.find({userId:id,status:"Accepted"})
        console.log(response,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
        let responseData=[];
        for(const newresponse of response){
            let package1=await packageagency.findById(newresponse.packageid)
            let agnc=await User.findById(package1.agencyid)
            console.log(package1,'rrrrrrrrrrrrrrrrrrrrrrrr');
            responseData.push({
                package1:package1,
                agnc:agnc,
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
router.get('/notificationdetail/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let response = await booking.findById(id);
    let packageDetail = await packageagency.findById(response.packageid);
    let guide = [];
    let guideRequests = await guiderequest.find({ bookingid: id, guidestatus: "Accepted" });
    for (let newaccept of guideRequests) {
        let guide1 = await User.findById(newaccept?.guideid);
        guide.push(guide1);
    }

    let adventures = [];
    for (const ad of response.adventureId) {
        let adventure = await adventureagency.findById(ad);
        adventures.push(adventure);
    }

    let resorts = [];
    let addedResortIds = []; // Keep track of added resort IDs

    for (const re of response.resortId) {
        let acceptResort = await resortenquire.find({ bookingid: id, resortstatus: 'Accepted', resortid: re });

        // Loop through accepted resorts
        for (let newaccept of acceptResort) {
            // Check if resort already added
            if (!addedResortIds.includes(newaccept.resortid)) {
                let resort = await User.findById(newaccept?.resortid);
                if (resort) {
                    let rooms = await room.findOne({ resortid: resort._id });
                    resorts.push({ resort, rooms });
                    addedResortIds.push(newaccept.resortid); // Add resort ID to tracking array
                }
            }
        }
    }

    // Calculate total amount
    let packagePrice = packageDetail.price;
    let adventurePrices = adventures.map(adventure => adventure.price);
    let resortPrices = resorts.map(resort => resort.rooms.standardPrice); // Assuming standard room price is considered

    let totalAmount = packagePrice + adventurePrices.reduce((acc, curr) => acc + curr, 0) + resortPrices.reduce((acc, curr) => acc + curr, 0);

    // Adding transportation cost
    let transportCost = packageDetail.transports.find(transport => transport.transportOption === response.selectedTransport)?.price || 0;
    totalAmount += transportCost;

    // Adding any other charges
    // You can add other charges here if needed

    let responseData = {
        package: packageDetail,
        guide: guide,
        adventures: adventures,
        resorts: resorts,
        booking: response,
        totalAmount: totalAmount // Adding total amount to responseData
    };

    res.json(responseData);
})
router.put('/payment/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.body);
    let response=await booking.findByIdAndUpdate(id,req.body)
    console.log(response);
})


export default router