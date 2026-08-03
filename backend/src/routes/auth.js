import express from "express";
import {
	forgotPassword,
	loginUser,
	logoutUser,
	refreshUser,
	registerUser,
	resetPassword,
	updateUserEmail,
	updateUserName,
	updateUserPassword,
} from "../controllers/auth-controller.js";
import { authenticate } from "../middleware/auth/authentication-handler.js";
import { validateInput } from "../middleware/auth/input_validation/input-validator.js";
import { emailUpdateSchema, forgotPassSchema, loginSchema, nameUpdateSchema, passwordUpdateSchema, registrationSchema, resetPassSchema } from "../middleware/auth/input_validation/input-schemas.js";
import validatePassword from "../middleware/auth/password-handler.js";
import { authorizeWithoutId } from "../middleware/auth/authorization-handler.js";

const router = express.Router();

router.put(
	"/me/name",
	authenticate,
	validateInput(nameUpdateSchema),
	authorizeWithoutId(["user", "admin"]),
	updateUserName,
);

router.put(
	"/me/email",
	authenticate,
	validateInput(emailUpdateSchema),
	authorizeWithoutId(["user", "admin"]),
	validatePassword,
	updateUserEmail,
);

router.put(
	"/me/password",
	authenticate,
	validateInput(passwordUpdateSchema),
	authorizeWithoutId(["user", "admin"]),
	validatePassword,
	updateUserPassword,
);

router.post("/register", validateInput(registrationSchema), registerUser);
router.post("/login", validateInput(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUser);
router.post("/forgot-pass", validateInput(forgotPassSchema), forgotPassword);
router.post("/reset-pass", validateInput(resetPassSchema), resetPassword);

export default router;
