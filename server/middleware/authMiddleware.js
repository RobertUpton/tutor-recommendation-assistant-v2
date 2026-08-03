const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Find user (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found.",
        });
      }

      return next();
    }

    return res.status(401).json({
      message: "Not authorized. No token provided.",
    });

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;