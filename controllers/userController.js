import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import generateToken from "../config/jwtToken.js";
import generateRefreshToken from "../config/refreshToken.js";
import User from "../models/userModel.js";
import validateMongoDBId from "../utils/validateMongoDB.js";

//User Sign-up one time register
//Notes:-
/*

  1- Email will be the inmdexing factor
  2- Password is hashed and then stored in the database
  3- For the authentication we have used the jsonweb token and bcrypt for hashing of password
 */
const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// const loginUser = expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   // console.log("Inside Login");

//   try {
//     const user = await User.findOne({ email });
//     //console.log(user);
//     const isPasswordMatching = await bcrypt.compare(password, user.password);

//     if (user && isPasswordMatching) {
//       const refreshToken = await generateRefreshToken(user?._id);
//       const updateuser = await User.findByIdAndUpdate(
//         user.id,
//         {
//           refreshToken: refreshToken,
//         },
//         {
//           new: true,
//         }
//       );
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//       });
//       res.json({
//         _id: user?._id,
//         email: user?.email,
//         token: generateToken(user?._id),
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // No user found with the provided email
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      // Password does not match
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const refreshToken = await generateRefreshToken(user._id);
    const updateUser = await User.findByIdAndUpdate(
      user.id,
      { refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//refresh token

const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  //console.log("Inside handle function");
  const cookie = req.cookies;
  //console.log(cookie);

  if (!cookie?.refreshToken) {
    return res.status(400).json({ message: "No Refresh Token in Cookies" });
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  //console.log(user);
  if (!user) {
    return res
      .status(403)
      .json({ message: "No Refresh token present in db or not matched" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      return res
        .status(403)
        .json({ message: "There is something wrong with refresh token" });
    }

    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //console.log(req.user);
  const newPassword = req.body.password;
  console.log(newPassword);
  const user = await User.findById(_id);
  if (newPassword) {
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password Updated Successfully" });
  } else {
    res.json({ message: "Password not updated" });
  }
});
//user logout

const logoutUser = expressAsyncHandler(async (req, res) => {
  console.log("Inside Logout");

  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    console.error("No Refresh Token in Cookies");
    return res.status(400).json({ message: "No Refresh Token in Cookies" });
  }

  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Set secure flag based on environment
    });
    return res.sendStatus(204); // No content
  }

  try {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Set secure flag based on environment
    });

    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get all users

const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one user by id

const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //validateMongoDBId(id);
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//deleting a user

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//updating a user details

const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDBId(_id);
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//block user by admin only
const blockUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//unblock user by admin only
const unblockUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json(unblockUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  blockUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  unblockUser,
  updatePassword,
  updateUser,
};
