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
category:{
    type:String,
},
coverImage:{
    type:String,
},
location:{
    type:String,
},
transports: [{
    noofppl:{
        type:String,
    },
    transportOption:{
        type:String,
    },
    price:{
        type:Number,
    },
    imgvehicle:{
        type:String,
    },
}],
destination:[{

    Day:{
        type:Number,
    },
    Destination:{
        type:String
    },
    activities:{
        type:String
    },
}],
defaultvehicle:{
    type:String,
},
vehicleimage:{
    type:String,
},
noofpeople:{
    type:Number,
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
defaulthotelId:{
    type:mongoose.Types.ObjectId,
    ref:User
},
defaultadventureId:[{
    type:mongoose.Types.ObjectId,
    ref:adventureagency
}],




adventureid:[{
    type:mongoose.Types.ObjectId,
    ref:adventureagency
}]
  
    
})
const packageagency=model('package',packageagencySchema)
export default packageagency