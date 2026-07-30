import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../stores/useProfileStore";
import { fallbackFetch } from "./fallback-fetch-api";

const fetchUserData = async (setAuthenticated, setLogin) => {
	try {
		const data = await fallbackFetch("http://localhost:8000/api/users/me", {
			method: "GET",
			credentials: "include",
		});

		setAuthenticated(true);

		return data.data;
	} catch (e) {
		setAuthenticated(false);

		if (e.status === 403) {
			setLogin(true);
		}

		throw e;
	}
	
};

//cannot use fallbackfetch because user isn't authenticated at this point
const loginUser = async ({ name, email, password }) => {
	const response = await fetch("http://localhost:8000/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Login account failed.");
	}

	return data.data;
};

//cannot use fallbackfetch because user login state should still be wiped even if auth somehow fails
//(e.g. access token runs out and the user tries logging out)
const logoutUser = async () => {
	const response = await fetch(
		"http://localhost:8000/api/auth/logout",
		{
			method: "POST",
			credentials: "include",
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Logout account failed.");
	}

	return data.message;
};

//add fallback fetch
const forgotPassword = async ({ email }) => {
	const response = await fetch("http://localhost:8000/api/auth/forgot-pass", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Create account failed");
	}

	return data.message;
};

const registerUser = async ({ name, email, password }) => {
	const response = await fetch("http://localhost:8000/api/auth/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Create account failed");
	}

	return data.data;
};

export const useFetchUser = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	return useQuery({
		queryKey: ["userDataFetch"],
		queryFn: () => fetchUserData(setAuth, setLogin),
		staleTime: 1000 * 60 * 5, //5 minutes
		refetchOnWindowFocus: false
	});
};

export const useRegisterUserMutation = () => {
	return useMutation({
		mutationFn: ({ name, email, password }) =>
			registerUser({ name, email, password }),
	});
};

export const useLoginMutation = () => {
	const profileHandleAuth = useProfileStore(
		(state) => state.handleAuthenticated,
	);

	const profileHandleLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ email, password }) => loginUser({ email, password }),
		onSuccess: () => {
			profileHandleAuth(true);
			profileHandleLogin(false);
		},
	});
};

export const useLogoutMutation = () => {
	const profileHandleAuth = useProfileStore(
		(state) => state.handleAuthenticated,
	);

	return useMutation({
		mutationFn: () => logoutUser(),
		onSuccess: () => profileHandleAuth(false),
	});
};

export const useForgotPassMutation = () => {
	return useMutation({
		mutationFn: ({ email }) => forgotPassword({ email }),
	});
};
