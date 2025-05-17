import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import crypto from "crypto";
import ApiError from "../utilis/apiError.js";
import sendEmail from "../utilis/sendEmail.js";

export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
  res.status(201).json({ data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  try {
    console.log('Login request received:', {
      email: req.body.email,
      time: new Date().toISOString()
    });

    // 1. Find user with password
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user) {
      console.log('User not found');
      return next(new ApiError("Incorrect email or password", 401));
    }

    // 2. Compare passwords
    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return next(new ApiError("Incorrect email or password", 401));
    }

    // 3. Verify JWT config
    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT_SECRET_KEY is missing!');
      throw new Error('JWT configuration error');
    }

    // 4. Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE_TIME || '1h' }
    );

    // Remove sensitive data
    user.password = undefined;

    console.log('Login successful for user:', user.email);
    res.status(200).json({ data: user, token });
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString()
    });
    next(new ApiError(`Login failed: ${error.message}`, 500));
  }
});

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Not authorized, no token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get full user from DB and attach to req.user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return next(new ApiError("User no longer exists", 401));
    }

    req.user = user; // ← This is the correct assignment
    next();
  } catch (err) {
    return next(new ApiError("Invalid token or expired", 401));
  }
};


export const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.user);
    console.log("User role:", req.user);
    console.log("Allowed roles:", roles);
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("You are not allowed to use this route", 403));
    }
    next();
  });

export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user for this email: ${req.body.email}`, 404)
    );
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  user.save();

  const message = `
Hi ${user.name}\n,
Use the code below to reset your password: \n
${resetCode} \n
This code expires in 10 minutes. If you didn’t request it, please ignore this email. \n
— Ecommerce Team
  `;
  await sendEmail({
    email: user.email,
    subject: "Your password reset code is valid for 10 minutes",
    message,
  });
  res.status(200).json({ status: "Success", message: "Reset code is sent" });
};
