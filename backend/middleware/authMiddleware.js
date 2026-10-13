const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
 const authorization = req.headers.authorization;
 const [scheme, token] = authorization?.split(" ") || [];

 if (scheme?.toLowerCase() !== "bearer" || !token) {
  return res.status(401).json({ message: "Not authorized, token required" });
 }

 let decoded;
 try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
 } catch (error) {
  if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
   return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
  return next(error);
 }

 try {
  req.user = await User.findById(decoded.user.id).select("-password");
  if (!req.user) {
   return res.status(401).json({ message: "Not authorized, user no longer exists" });
  }
  return next();
 } catch (error) {
  return next(error);
 }
};


// Middleware to check if the user is an admin
const admin = (req, res, next) => {
 if (req.user && req.user.role === "admin") {
  next();
 } else {
  res.status(403).json({mesage: "Not authorized as an admin"});
 }
};

module.exports = {protect, admin};