import express from "express";
import {
  register,
  login,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

// Sign up route
router.post("/register", register);

// Sign in route
router.post("/login", login);

// Update user route
router.put("/:userId", updateUser).get("/:userId", getUser);

export default router;
