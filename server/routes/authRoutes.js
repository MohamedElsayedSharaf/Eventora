import express from "express";
import {
  signup,
  login,
  forgotPassword,
} from "../controllers/authController.js";
import {
  signupValidator,
  loginValidator,
} from "../utilis/validators/authValidator.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);

export default router;
