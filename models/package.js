import mongoose,{ Schema,model} from "mongoose";
import { User } from "./user.js";

const packageagencySchema=new Schema({
agencyid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
packageName:{
    type:String,
},
coverImage:{
    type:String,
},
location:{
    type:String,
},
destination:{
    type:String,
},
noOfDays:{
    type:String,
},
uploadBrochure:{
    type:String,
},
basicDescription:{
    type:String,
},
detailedDescription:{
    type:String,
},


    
})
const packageagency=model('package',packageagencySchema)
export default packageagency