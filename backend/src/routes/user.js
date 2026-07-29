import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUserByAuth,
	getUserById,
	updateUser,
} from "../controllers/user-controller.js";
import validatePassword from "../middleware/auth/password-handler.js";
import { authenticate } from "../middleware/auth/authentication-handler.js";
import {
	authorizeWithId,
	authorizeWithoutId,
} from "../middleware/auth/authorization-handler.js";
import { validateInput } from "../middleware/auth/input_validation/input-validator.js";
import { userAllInfoUpdateSchema } from "../middleware/auth/input_validation/input-schemas.js";

const router = express.Router();

//user routes
router.get("/me", authenticate, getUserByAuth);

//admin routes
router.get("/", authenticate, authorizeWithoutId(["admin"]), getAllUsers);
router.get(
	"/:id",
	authenticate,
	authorizeWithoutId(["admin"]),
	getUserById,
);

router.put(
	"/:id",
	validateInput(userAllInfoUpdateSchema),
	authenticate,
	authorizeWithoutId(["admin"]),
	validatePassword,
	updateUser,
);

router.delete(
	"/:id",
	authenticate,
	authorizeWithoutId(["admin"]),
	deleteUser,
);


export default router;
