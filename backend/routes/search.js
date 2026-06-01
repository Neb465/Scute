import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	try {
		const response = await fetch(
			"https://api.openrouteservice.org/v2/directions/foot-walking",
			{
				method: "POST",
				headers: {
					"Authorization": process.env.ors_key,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"coordinates": req.query.coords //figure out how this works later
				})
			}
		);

		const result = await response.json();
		res.json(result);
	} catch (e){
		res.status(500);
	}
});

export default router;
