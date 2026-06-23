import express from "express";
import {
	calcDist,
	getMapClick,
	getSearch,
} from "../controllers/mapAPIController.js";

const router = express.Router();

router.get("/click", getMapClick);

router.get("/search", getSearch);

router.post("/calcDist", calcDist);

export default router;
