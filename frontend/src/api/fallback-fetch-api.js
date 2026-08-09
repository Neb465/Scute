const createFetchError = (message, status) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const fallbackFetch = async (url, options = {}) => {
	const fetchOptions = { ...options, credentials: "include" };

	let response = await fetch(url, fetchOptions);

	if (response.status === 401) {
		const refetch = await fetch(`${API_URL}/api/auth/refresh`, {
			method: "POST",
			credentials: "include",
		});

		if (refetch.status === 403) {
			throw createFetchError("Session expired. Re-login.", 403);
		}

		if (!refetch.ok) {
			throw createFetchError("Unable to refresh session.", refetch.status);
		}

		response = await fetch(url, fetchOptions);
	}

	const data = await response.json();

	if (!response.ok) {
		throw createFetchError(data.message || "Failed to fetch", response.status);
	}

	return data;
};
