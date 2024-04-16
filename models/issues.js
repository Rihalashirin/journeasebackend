import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";
import packageagency from "./package.js";
import booking from "./booking.js";


const issueSchema= new Schema({
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User

    },
    issue:{
        type:String,
    },
    packageid:{
        type:mongoose.Types.ObjectId,
        ref:packageagency
    },
    bookingid:{
        type:mongoose.Types.ObjectId,
        ref:booking
    }
})
const Issue=model('issues',issueSchema)
export default Issue