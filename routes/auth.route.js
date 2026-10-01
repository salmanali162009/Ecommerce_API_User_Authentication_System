import signupUser from "../controller/auth/signup.controller.js";
import loginUser from "../controller/auth/login.controller.js";
import getMe from "../controller/auth/me.controller.js";
import express from 'express'
import authMiddleware from "../middleware/auth.middleware.js";
import logoutUser from "../controller/auth/logout.controller.js";
import resetPassword from "../controller/auth/changePassword.controller.js";
import forgotPassword from "../controller/auth/forgotPassword.controller.js";

const router =  express.Router()

router.post('/register' , signupUser)
router.post('/login' , loginUser)
router.get('/me',authMiddleware,getMe)
router.post('/logout',logoutUser)
router.post('/reset-password',resetPassword)
router.post("/forgot-password", forgotPassword);
export default router