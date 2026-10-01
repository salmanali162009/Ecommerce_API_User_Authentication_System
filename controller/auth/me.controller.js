import User from "../../model/User.js";

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -resetPasswordToken -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found"
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User data fetched successfully",
      data: user
    });

  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};

export default getMe;