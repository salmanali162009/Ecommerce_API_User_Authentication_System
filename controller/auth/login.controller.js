import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../../model/User.js'
const loginUser = async (req,res)=>{
try{
    const {email , password} = req.body;
    if(!email || !password ){
        return res.status(400).json({
            status:400,
            message: "Email and password are required"
        })
    }
    const user =  await User.findOne({email})

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    )

      if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password"
      });
    }
    
     const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
    
    

    return res.status(200).json({
      status: 200,
      message: "Login successful",
      data:{
        name : user.name,
        email:user.email,
        _id : user._id,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
      }
      
    });

}catch(error){
    console.log('login error',error)
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
}

}
export default loginUser