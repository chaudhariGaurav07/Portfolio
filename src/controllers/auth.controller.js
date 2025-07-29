import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// One-time admin creation
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(200).json(new ApiResponse(200, null, "Admin already exists"));
    }

    const newUser = await User.create({ name, email, password });

    res.status(201).json(
      new ApiResponse(201, {
        name: newUser.name,
        email: newUser.email,
      }, "Admin created")
    );
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }

    const token = generateToken(user);
    res.status(200).json(
      new ApiResponse(200, {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      }, "User logged in successfully")
    );
  } catch (err) {
    next(err);
  }
};
