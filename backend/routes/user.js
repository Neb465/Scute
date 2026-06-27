import express from "express";
import {
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../controllers/userController.js";
import validateInput from "../middleware/inputValidator.js";
import validatePassword from "../middleware/auth/passwordHandler.js";
import { authenticate } from "../middleware/auth/authenticationHandler.js";
import { authorizeWithId, authorizeWithoutId } from "../middleware/auth/authorizationHandler.js";

const router = express.Router();

router.get("/", authenticate, authorizeWithoutId(["admin"]), getAllUsers);
router.get("/:id", authenticate, authorizeWithId(["admin", "user"]), getUserById);

router.put("/:id", validateInput, validatePassword, authenticate, authorizeWithId(["admin", "user"]), updateUser);

router.delete("/:id", authenticate, authorizeWithId(["admin", "user"]), deleteUser);

export default router;
