import mongoose, {Schema,model} from "mongoose";
import booking from "./booking.js";
import User from "./user.js";
const resortreviewSchema=Schema({
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking
    },
   review:{
       type:String,
   },
   propertyName:{
    type:String,
   },

   accomodatn:{
    type:String,
   },
   resortId:{
    type:mongoose.Types.ObjectId,
    ref:User
   }


})
const reviewresorts=model('resortReview',resortreviewSchema)
export default reviewresorts