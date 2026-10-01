import bcrypt from "bcrypt";
import User from "../../model/User.js";

const resetPassword = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Request body is required"
      });
    }

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        status: 400,
        message: "Token and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 400,
        message: "New password must be at least 6 characters"
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Invalid or expired reset token"
      });
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = newPasswordHash;

    // Reset token ko remove karo
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "Password reset successfully"
    });

  } catch (error) {

    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};

export default resetPassword;