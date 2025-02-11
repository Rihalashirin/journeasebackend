import mongoose,{Schema,model} from "mongoose"
 
const userSchema=new Schema({
    name:{
        type:String,
        

    },
    age:{
        type:Number,
        
    },
    gender:{
        type:String,
        
    },
    contactNumber:{
        type:Number,
        unique:true,
        

    },
    place:{
        type:String,
    },
    image:{
        type:String,
    },
    idProof:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
        
    companyName:{
        type:String,
        
    },
    licenseNumber:{
        type:String,
        unique:true,
    },
    place:{
        type:String
    },
    district:{
        type:String,
    },
    pin:{
        type:Number,
    },
    description:{
        type:String
    },
    aboutUs:{
        type:String
    },
    whyUs:{
        type:String
    },
    events:{
        type:String
    },
    licenseProof:{
        type:String
    },
    contactNumberalternative:{
        type:Number,

    },
    companyLogo:{
        type:String
    },
    information:{
        type:String
    },
    address:{
        type:String
    },
    
    locationExpertise:{
        type:String
    },
    experienceYears:{
        type:String
    },
    propertyName:{
        type:String
    },
    registrationNumber:{
        type:String,
        unique:true
    },
    propertyAddress:{
        type:String
    },
    ownerName:{
        type:String
    },
    coverImage:{
        type:String
    },
    luxury:{
        type:Number
    },
    standard:{
        type:Number
    },
    roomtype:{
        type:String
    },
    luxuryOccupancy:{
        type:Number
    },
    standardOccupancy:{
        type:Number
    },
    luxuryprice:{
        type:Number
    },
    standardPrice:{
        type:Number
    },
    images:{
        type:String
    },
    place:{
        type:String
    },

    userType:{
        type:String,
    },
    status:{
        type:String,
        default:'pending'
    }
})
 const User = model('user',userSchema)
 export default User
