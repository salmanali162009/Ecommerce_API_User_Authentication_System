import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors'

import connectDb from './config/db.js'
import cookieParser from "cookie-parser";
import UserRouter from './routes/auth.route.js'
import ProductRouter from './routes/product.route.js'

const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: "https://bazario-v1.vercel.app",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;
connectDb()

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/api',UserRouter)
app.use('/api',ProductRouter)






app.listen(PORT,()=>{
    console.log('app is running on port ' ,PORT);
    
})
