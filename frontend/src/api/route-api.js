import { useMutation } from "@tanstack/react-query";
import { fallbackFetch } from "./fallback-fetch-api";
import { useProfileStore } from "../stores/useProfileStore";

const handleSessionError = (e, setAuthentication, setLogin) => {
	if (e.status === 403) {
		setAuthentication(false);
		setLogin(true);
	}
};

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const fetchRoute = async ({ start, goal, setAuthentication, setLogin }) => {
	try {
		const response = await fallbackFetch(`${API_URL}/api/astar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ start, goal }),
		});

		return response.path;
	} catch (e) {
		handleSessionError(e, setAuthentication, setLogin);
		throw e;
	}
};

export const useRouteMutation = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ start, goal }) =>
			fetchRoute({ start, goal, setAuthentication: setAuth, setLogin: setLogin }),
	});
};
