import { useState } from "react";
import { useRouteMutation } from "../api/route-api.js";

export const useRoute = () => {
	const { mutate, data, isPending, isError, error } = useRouteMutation();

	const route = data ? data[0] : [];
	const dist = data ? data[1] : 0;

	return { 
		route, 
		dist,
		error: error ? error.message : "",
		isError: isError,
		isPending,
		getRoute: (start, goal) => mutate({ start, goal })
	};
};
