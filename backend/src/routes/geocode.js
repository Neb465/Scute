import express from "express";
import { fetchAutoFill } from "../controllers/geocode-controller.js";

const router = express.Router();

router.get("/", fetchAutoFill);

export default router;