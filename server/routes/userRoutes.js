import express from "express";
import {
  getCurrentUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, allowedTo } from "../controllers/authController.js";

const router = express.Router();

// Get current user
router.get("/me", protect, getCurrentUser);

// Get all users (admin only)
router.get("/", protect, allowedTo("admin"), getAllUsers);

// Update user by ID
router.put("/:id", protect, updateUser);

// Delete user by ID
router.delete("/:id", protect, deleteUser);

export default router;
