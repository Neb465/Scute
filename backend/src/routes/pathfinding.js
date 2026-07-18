import express from "express";
import { findPath } from "../controllers/pathfinding-controller.js";
import { validateInput } from "../middleware/auth/input_validation/input-validator.js";
import { searchSchema } from "../middleware/auth/input_validation/input-schemas.js";

const router = express.Router();

router.post("/", validateInput(searchSchema), findPath);

export default router;
