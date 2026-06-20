import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
		const response = await fetch(
			`https://api.openrouteservice.org/geocode/reverse?api_key=${process.env.ors_key}&point.lon=${req.body.lon}&point.lat=${req.body.lat}`,
		);

		const result = await response.json();

		res.json(result);
	} catch (e) {
		res.status(500);
	}
});

export default router;