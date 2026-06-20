import express from "express";
import got from "got";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		// example using got library
		// const response = await got.post(
		// 	"https://api.openrouteservice.org/v2/directions/foot-walking",
		// 	{
		// 		headers: {
		// 			Authorization: process.env.ors_key,
		// 			"Content-Type": "application/json",
		// 		},
		// 		json: {
		// 			coordinates: [
		// 				[8.681495, 49.41461],
		// 				[8.686507, 49.41943],
		// 				[8.687872, 49.420318],
		// 			],
		// 		},
		// 	},
		// );

		// const result = response.body;

		const response = await fetch(
			"https://api.openrouteservice.org/v2/directions/foot-walking",
			{
				method: "POST",
				headers: {
					Authorization: process.env.ors_key,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					coordinates: req.body.coords
				}),
			},
		);

		const result = await response.json();

		res.json(result);
	} catch (e) {
		res.status(500);
	}
});

export default router;
