import express from "express";
import {
	deleteUser,
	getAllUsers,
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

router.get("/", authenticate, authorizeWithoutId(["admin"]), getAllUsers);
router.get(
	"/:id",
	authenticate,
	authorizeWithId(["admin", "user"]),
	getUserById,
);

router.put(
	"/:id",
	validateInput(userAllInfoUpdateSchema),
	validatePassword,
	authenticate,
	authorizeWithId(["admin", "user"]),
	updateUser,
);

router.delete(
	"/:id",
	authenticate,
	authorizeWithId(["admin", "user"]),
	deleteUser,
);

export default router;
