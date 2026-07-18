import { useState } from "react";
import { fetchRoute } from "../api/route-api.js";

export const useRouteButton = () => {
	const [route, setRoute] = useState([]);
	const [error, setError] = useState(null);

	const getRoute = async (start, goal) => {
		try {
			const data = await fetchRoute(start, goal);

			setRoute(data);
      setError(null);
		} catch (e) {
			setRoute([]);
			setError(e.message);
		}
	};

	return { route, error, setRoute, getRoute};
};
