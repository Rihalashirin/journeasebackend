import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";


const issueSchema= new Schema({
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User

    },
    issue:{
        type:String,
    }
})
const Issue=model('issues',issueSchema)
export default Issue