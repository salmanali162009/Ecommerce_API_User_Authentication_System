import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  try {
   const token = req.cookies.token;

    

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Authentication token required"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: "Session expired, please login again"
      });
    }

    return res.status(401).json({
      status: 401,
      message: "Invalid authentication token"
    });
  }
};

export default authMiddleware;