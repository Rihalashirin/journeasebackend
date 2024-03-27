import mongoose, {Schema,model} from "mongoose";
const adventureSchema=Schema({
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

})
const adventureagency=model('adventure',adventureSchema)
export default adventureagency