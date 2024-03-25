import mongoose,{ Schema,model} from "mongoose";

const packageagencySchema=Schema({
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