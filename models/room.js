import mongoose,{ Schema,model} from "mongoose";
import  User  from "./user.js";

const roomSchema= new Schema({
    luxury:{
        type:Number
    },
    standard:{
        type:Number
    },
    roomtype:{
        type:String
    },
    luxuryOccupancy:{
        type:Number
    },
    standardOccupancy:{
        type:Number
    },
    luxuryprice:{
        type:Number
    },
    standardPrice:{
        type:Number
    },
    images:{
        type:String
    },
    image:{
        type:String
    },
    resortid:{
        type:mongoose.Types.ObjectId,
        ref:User
    }

})
const room=model('room',roomSchema)
export default room