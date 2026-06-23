import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name : {
    type : String ,
    required : true ,
    trim : true 
  },
  category : {
    type : String ,
    required : true ,
    trim : true 
  },
  price : {
    type : Number ,
    required : true 
  }
},
{timestamps : true})

productSchema.index({
  createdAt: -1,
  _id: -1,
});

productSchema.index({
  category: 1,
  createdAt: -1,
  _id: -1,
})

const Product = await mongoose.model("Product",productSchema)
export default Product; 