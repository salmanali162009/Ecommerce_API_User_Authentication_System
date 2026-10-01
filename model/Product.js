
import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: {
        required : true,
        type : String,
    },

    description : {
        type : String,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    imageUrl: {
            type: String,
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
},
{ timestamps: true }
)
const Product = mongoose.model('Product',  ProductSchema )
export default Product