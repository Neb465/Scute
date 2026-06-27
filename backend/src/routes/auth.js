import express from "express";
import {
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
} from "../controllers/authController.js";
import validateRegistration from "../middleware/auth/registrationValidator.js";
import validateLogin from "../middleware/auth/loginValidator.js";
import { authenticate } from "../middleware/auth/authenticationHandler.js";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", authenticate, logoutUser);
router.post("/refresh", refreshUser);

export default router;
