import { useState } from "react";
import { fetchRoute } from "../api/route-api.js";

export const useRouteButton = () => {
	const [route, setRoute] = useState([]);

  const getRoute = async (start, goal) => {
    const data = await fetchRoute(start, goal);

    setRoute(data);
  }

	return { route, getRoute };
}