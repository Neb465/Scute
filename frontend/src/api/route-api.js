import { useMutation } from "@tanstack/react-query";
import { fallbackFetch } from "./fallback-fetch-api";



const fetchRoute = async ({ start, goal }) => {
	// const startFloat = [parseFloat(start[0]), parseFloat(start[1])];
	// const goalFloat = [parseFloat(goal[0]), parseFloat(goal[1])];

	const response = await fallbackFetch("http://localhost:8000/api/astar", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			start: start,
			goal: goal,
		}),
		credentials: "include"
	});

	return response.path;
};

export const useRouteMutation = () => {
	return useMutation({
		mutationFn: fetchRoute,
	});
};
