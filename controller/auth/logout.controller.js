const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    return res.status(200).json({
      status: 200,
      message: "Logout successful"
    });

  } catch (error) {
    console.log("Logout error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};

export default logoutUser;