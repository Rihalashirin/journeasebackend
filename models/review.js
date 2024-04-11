import mongoose, {Schema,model} from "mongoose";
import packageagency from "./package.js";
import booking from "./booking.js";


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
   }

})
const reviewuser=model('review',reviewSchema)
export default reviewuser