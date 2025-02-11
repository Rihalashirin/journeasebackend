import mongoose, {Schema,model} from "mongoose";
import packageagency from "./package.js";
import booking from "./booking.js";
import User from "./user.js";


const reviewSchema=Schema({
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking
    },
   review:{
       type:String,
   },
   destinationName:{
    type:String,
   },

   accomodatn:{
    type:String,
   }


})
const reviewuser=model('review',reviewSchema)
export default reviewuser