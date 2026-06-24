import express from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../controllers/userController.js";
import validateInput from "../middleware/inputValidator.js";
import validatePassword from "../middleware/auth/passwordValidator.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", validateInput, createUser);

router.put("/:id", validateInput, validatePassword, updateUser);

router.delete("/:id", deleteUser);

export default router;
