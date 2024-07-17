import mongoose,{ Schema,model} from "mongoose";
import packageagency from "./package.js";
import User from "./user.js";
import adventureagency from "./adventure.js";
import room from "./room.js";


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
    resortstatus:{
        type:String,
        default:"pending"
    },
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
        type:String,
        default:'no'
    },
   
    experience:{
        type:String
    },
    
    gender:{
        type:String
    },
   
    guide:{
        type:String,
        default:'yes'
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
    },
    wage:{
        type:Number,
        default:0
    },
    roomid:{
        type:mongoose.Types.ObjectId,
        ref:room, 
    },
    healthwage:{

      type:Number,
    },
    BillAmount:{
        type:Number,
    },
    
})
const booking=model('booking',booktripSchema)
export default booking