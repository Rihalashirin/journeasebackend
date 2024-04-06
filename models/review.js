import mongoose, {Schema,model} from "mongoose";
import packageagency from "./package.js";


const reviewSchema=Schema({
    destinationId:{
        type:mongoose.Types.ObjectId,
        ref:packageagency
    }

})
const reviewuser=model('review',reviewSchema)
export default reviewuser