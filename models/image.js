import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";
import booking from "./booking.js";

const imageSchema=new Schema({
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User,

    },
    images:{
        type:String,
    },
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking,  
    }
})
const imagesguide=model('images',imageSchema)
export default imagesguide