import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//Authentication Handler

const authHandler = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded?.id);
      // console.log(user);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ message: "Session Expired Please Login Again" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

//Checking for Admin

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user?.role !== "admin") {
    return res.status(401).json({ message: "Not authorized as an admin" });
  }
  next();
};

export { authHandler, isAdmin };
