import mongoose,{ Schema,model} from "mongoose";
import User from "./user.js";
import booking from "./booking.js";

const requestguideSchema=Schema({
    agencyid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User, 
    },
    status:{
        type:String,
        default:"pending"
    },
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking, 
    }
})
const guiderequest=model('guiderequest',requestguideSchema)
export default guiderequest