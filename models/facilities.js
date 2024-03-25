import mongoose,{Schema,model} from "mongoose"

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
    userid:{
    type:mongoose.Types.ObjectId
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