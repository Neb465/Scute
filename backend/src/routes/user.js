import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUserByAuth,
	getUserById,
} from "../controllers/user-controller.js";
import validatePassword from "../middleware/auth/password-handler.js";
import { authenticate } from "../middleware/auth/authentication-handler.js";
import { authorizeWithoutId } from "../middleware/auth/authorization-handler.js";
import { validateInput } from "../middleware/auth/input_validation/input-validator.js";

const router = express.Router();

//user routes
router.get("/me", authenticate, getUserByAuth);

router.delete(
	"/me",
	authenticate,
	authorizeWithoutId(["user", "admin"]),
	deleteUser,
);

//admin routes
router.get("/", authenticate, authorizeWithoutId(["admin"]), getAllUsers);
router.get(
	"/:id",
	authenticate,
	authorizeWithoutId(["admin"]),
	getUserById,
);

export default router;
