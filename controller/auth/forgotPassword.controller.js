import crypto from "crypto";
import User from "../../model/User.js";
import sendResetEmail from "../../utils/sendemail.js";

const forgotPassword = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Request body is required"
      });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      });
    }

    // Generate random reset token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Save token
    user.resetPasswordToken = resetToken;

    // Token expires after 15 minutes
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // Send email
    await sendResetEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      status: 200,
      message: "Password reset link sent to your email"
    });

  } catch (error) {

    console.error(
      "Forgot password error:",
      error
    );

    return res.status(500).json({
      status: 500,
      message: "Unable to send password reset email"
    });
  }
};

export default forgotPassword;