import express from "express";
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

export default router