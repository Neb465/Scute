import express from "express";
import {
	calcDist,
	getMapClick,
	getSearch,
} from "../controllers/mapAPIController.js";

const router = express.Router();

router.get("/interactions", getMapClick);
router.get("/places", getSearch);

router.post("/distances", calcDist);

export default router;
