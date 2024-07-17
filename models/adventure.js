import mongoose, {Schema,model} from "mongoose";
import  User  from "./user.js";
const adventureSchema=Schema({
    agencyid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    adventureName:{
      type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    image:{
        type:String,

    },
    location:{
        type:String,
    },
    question:{
        type:String,
    },
    answer:{
        type:String,
    }


})
const adventureagency=model('adventure',adventureSchema)
export default adventureagency