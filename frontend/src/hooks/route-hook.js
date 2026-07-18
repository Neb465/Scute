import { useState } from "react";
import { fetchRoute } from "../api/route-api.js";

export const useRoute = () => {
	const [route, setRoute] = useState([]);
	const [dist, setDist] = useState(0);
	const [error, setError] = useState(null);

	const getRoute = async (start, goal) => {
		try {
			const data = await fetchRoute(start, goal);

			setDist(data[1]);
			setRoute(data[0]);
      setError(null);
		} catch (e) {
			setRoute([]);
			setDist(0);
			setError(e.message);
		}
	};

	return { dist, route, error, getRoute};
};
