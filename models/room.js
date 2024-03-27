import mongoose,{ Schema,model} from "mongoose";

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

})
const room=model('room',roomSchema)
export default room