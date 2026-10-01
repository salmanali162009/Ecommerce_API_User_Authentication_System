import  User  from "../../model/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Joi from "joi";
const userSchema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})

const signupUser = async (req,res)=>{
try{
    await userSchema.validateAsync(req.body)
    const {name , email , password} = req.body;
    if(!name || !email || !password ){
        return res.status(400).json({
            status:400,
            message: "All fields are required"
        })
    }
    
    const passwordHash = await bcrypt.hash(password , 10)
    const createUser =  await User.create({
        name,
        email,
        password : passwordHash,
    })
    const token = jwt.sign(
          { userId: createUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
    
        res.cookie(
          "token",
          token,
          {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 7 * 24 * 60 * 60 * 1000
          }
        )
return res.status(201).json({ status: 201, message: "User registered successfully",
 data: {
    name: createUser.name,
    email:createUser.email,
    _id:createUser._id,
    createdAt:createUser.createdAt,
    updatedAt:createUser.updatedAt,
} });

}catch(error){
    if (error.code === 11000) {
    return res.status(409).json({
      status: 409,
      message: "Email already registered"
    });
  }
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
}

}
export default signupUser