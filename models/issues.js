import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";
import packageagency from "./package.js";


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
    }
})
const Issue=model('issues',issueSchema)
export default Issue