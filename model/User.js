import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        required : true,
        type : String,
    },

    email : {
        required : true,
        type : String,
        unique: true
    },
    password:{
        required : true,
        type : String,
    },
    resetPasswordToken: {
  type: String,
  default: null
},

resetPasswordExpires: {
  type: Date,
  default: null
}

},
{ timestamps: true }
)
const User = mongoose.model('User', UserSchema)
export default User