import mongoose,{ Schema,model} from "mongoose";
import packageagency from "./package.js";
import User from "./user.js";
import adventureagency from "./adventure.js";


const booktripSchema=new Schema({

    packageid:{
        type:mongoose.Types.ObjectId,
        ref:packageagency
    },
    resortId:[{
        type:mongoose.Types.ObjectId,
        ref:User
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    adventureId:[{
        type:mongoose.Types.ObjectId,
        ref:adventureagency
    }],
    guidestatus:{
        type:String,
        default:"pending"
    },
    healthstatus:{
     type:String,
     default:"pending"
    },
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
   
    health:{
        type:String
    },
   
    experience:{
        type:String
    },
    
    gender:{
        type:String
    },
   
    guide:{
        type:String
    },
    adult:{
        type:Number
    },
    child:{
        type:Number
    },
    pickingplace:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now,
    },
    status:{
        type:String,
        default:"pending"
    },
    accomodatn:{
        type:String,
    },
    selectedTransport:{
        type:String,
    }
    
})
const booking=model('booking',booktripSchema)
export default booking