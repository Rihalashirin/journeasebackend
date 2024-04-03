import mongoose,{ Schema,model} from "mongoose";
import User from "./user.js";

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
})
const guiderequest=model('guiderequest',requestguideSchema)
export default guiderequest