import mongoose,{ Schema,model} from "mongoose";
import booking from "./booking.js";
import User from "./user.js";

const resortSchema = new Schema({
    resortid:{
         type:mongoose.Types.ObjectId,
         ref:User
    },
    resortstatus:{
        type:String,
        default:"pending"
    },
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking
    },
    fromDate:{
        type:Date
    },
    toDate:{
        type:Date
    }

})

const resortenquire=model('resort',resortSchema)
export default resortenquire