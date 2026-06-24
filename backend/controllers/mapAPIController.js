//TODO: add edge cases/user bing bong brute force checks into getMapClick and getSearch, similar to that of calcDist


// @desc Get information of places near clicked point on map
// @route GET /api/map/click
export const getMapClick = async (req, res, next) => {
	const lon = Number(req.query.lon);
	const lat = Number(req.query.lat);

	if (Number.isNaN(lon) || Number.isNaN(lat)) {
		return res.status(400).json({ error: "lon and lat must be valid numbers" });
	}

	try {
		const result = await fetch(
			`https://api.openrouteservice.org/geocode/reverse?api_key=${process.env.ors_key}&point.lon=${lon}&point.lat=${lat}`,
			{
				method: "GET",
				headers: {
					"Accept-Language": "en",
				},
			},
		);
		const resultJSON = await result.json();

		if (!result.ok) {
			return res.status(result.status).json(resultJSON);
		}

		res.status(200).json(resultJSON);
	} catch (e) {
		next(e);
	}
};

// @desc Get information for a place based on search
// @route GET api/map/search
export const getSearch = async (req, res, next) => {
	try {
		//focuspointlon and focuspointlat are used to determine search results closest to that point
		const result = await fetch(
			`https://api.openrouteservice.org/geocode/search?api_key=${process.env.ors_key}&text=${req.query.searchQuery}&focus.point.lon=${Number(req.query.focusPointLon)}&focus.point.lat=${Number(req.query.focusPointLat)}`,
			{
				method: "GET",
				headers: {
					"Accept-Language": "en",
				},
			},
		);

		const resultJSON = await result.json();

		res.status(200).json(resultJSON);
	} catch (e) {
		next(e);
	}
};

// @desc Calculate distances between two points on map
// @route POST /api/map/calcDist
export const calcDist = async (req, res, next) => {
	try {
		const result = await fetch(
			"https://api.openrouteservice.org/v2/directions/foot-walking",
			{
				method: "POST",
				headers: {
					Authorization: process.env.ors_key,
					"Content-Type": "application/json",
					"Accept-Language": "en",
				},
				body: JSON.stringify({
					coordinates: req.body.coords,
				}),
			},
		);

		const resultJSON = await result.json();

		res.status(200).json(resultJSON);
	} catch (e) {
		res.status(500);
	}
};
