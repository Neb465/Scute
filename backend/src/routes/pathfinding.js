import express from "express";
import { findPath } from "../services/pathfinding-service.js";

const router = express.Router();

router.post("/", findPath);

export default router;
