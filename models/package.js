import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";
import adventureagency from "./adventure.js";

const packageagencySchema=new Schema({
agencyid:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
packageName:{
    type:String,
    required:true
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
price:{
    type:Number,
},
resortId:[{
    type:mongoose.Types.ObjectId,
    ref:User

}],



adventureid:[{
    type:mongoose.Types.ObjectId,
    ref:adventureagency
}]
  
    
})
const packageagency=model('package',packageagencySchema)
export default packageagency