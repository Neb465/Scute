//Constants

const ASTAR_URL = process.env.ASTAR_URL || "http://localhost:5001";

export const findPath = async (req, res, next) => {
	const { start, goal } = req.body;
	try {
		const response = await fetch(`${ASTAR_URL}/astar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ start, goal }),
		});

		const path = await response.json();

		if (!response.ok) {
			console.log("response not ok");
			return res.status(response.status).json({ msg: path.msg });
		}

		return res.status(200).json(path);
	} catch (e) {
		next(e);
	}
};
