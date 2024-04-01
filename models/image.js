import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";

const imageSchema=new Schema({
    guideid:{
        type:mongoose.Types.ObjectId,
        ref:User,

    },
    images:{
        type:String,
    },
})
const imagesguide=model('images',imageSchema)
export default imagesguide