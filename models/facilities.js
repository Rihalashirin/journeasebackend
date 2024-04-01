import mongoose,{Schema,model} from "mongoose"
import  User  from "./user.js"

const facilitySchema=Schema({
  
    luxury:{
      type:Boolean
    },
    standard:{
      type:Boolean
    },
    name:{
      type:String
    },
    resortid:{
    type:mongoose.Types.ObjectId,
    ref:User,
    }
  
   // spa:{
   //  type:Boolean
   // },
   // commonpool:{
   //  type:Boolean
   // },
   // privatepool:{
   //  type:Boolean
   // },
   // wellnessClasses:{
   //  type:Boolean
   // },
   // sportsFacilities:{
   //  type:Boolean
   // },
   // childcareFacility:{
   //  type:Boolean
   // },
   // petfriendlyFacilities:{
   //  type:Boolean
   // },
   // vehicleRental:{
   //  type:Boolean
   // },
})
let Facility=model('Facility',facilitySchema)
export default Facility