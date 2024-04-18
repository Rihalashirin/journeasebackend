import mongoose,{ Schema,model} from "mongoose";
import User from "./user.js";
import booking from "./booking.js";

const enquiryguideSchema=Schema({
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    agencyid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    status:{
        type:String,
        default:'pending'
    },
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking
    }
    
})
let enquiryguide=model('enquiryguide',enquiryguideSchema)
export default enquiryguide