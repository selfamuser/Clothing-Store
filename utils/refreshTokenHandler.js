import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";

const refreshTokenHandler = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: "No Refresh Token" });
  }

  const refreshToken = cookies.refreshToken;

  // Check if the token is blacklisted
  const blacklisted = await Blacklist.findOne({ token: refreshToken });
  if (blacklisted) {
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(403).json({ message: "Invalid User" });
    }

    // Generate new tokens and send them
    // ...
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
});
