import express from "express";
import {
	forgotPassword,
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
	resetPassword,
} from "../controllers/auth-controller.js";
import { authenticate } from "../middleware/auth/authentication-handler.js";
import { validateInput } from "../middleware/auth/input_validation/input-validator.js";
import { forgotPassSchema, loginSchema, registrationSchema, resetPassSchema } from "../middleware/auth/input_validation/input-schemas.js";

const router = express.Router();

router.post("/register", validateInput(registrationSchema), registerUser);
router.post("/login", validateInput(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUser);
router.post("/forgot-pass", validateInput(forgotPassSchema), forgotPassword);
router.post("/reset-pass", validateInput(resetPassSchema), resetPassword);

export default router;
