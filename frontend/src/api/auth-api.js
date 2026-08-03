import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../stores/useProfileStore";
import { fallbackFetch } from "./fallback-fetch-api";

const handleSessionError = (e, setAuthenticated, setLogin) => {
	if (e.status === 403) {
		setAuthenticated(false);
		setLogin(true);
	}
};

const fetchUserData = async (setAuthenticated, setLogin) => {
	try {
		const data = await fallbackFetch("http://localhost:8000/api/users/me", {
			method: "GET",
		});

		setAuthenticated(true);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
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
	const response = await fetch("http://localhost:8000/api/auth/logout", {
		method: "POST",
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Logout account failed.");
	}

	return data.message;
};

const forgotPassword = async ({ email }) => {
	const response = await fetch("http://localhost:8000/api/auth/forgot-pass", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
		}),
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Forgot password call failed.");
	}

	return data.message;
};

const updateName = async ({ fieldQuery, setAuthenticated, setLogin }) => {
	try {
		const data = await fallbackFetch(
			`http://localhost:8000/api/auth/me/name`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fieldQuery: fieldQuery,
				}),
			},
		);

		setAuthenticated(true);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const updateEmail = async ({ fieldQuery, password, setAuthenticated, setLogin }) => {
	try {
		const data = await fallbackFetch(
			`http://localhost:8000/api/auth/me/email`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fieldQuery: fieldQuery,
					password: password
				}),
			},
		);

		setAuthenticated(true);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const updatePass = async ({ newPassword, password, setAuthenticated, setLogin }) => {
	try {
		const data = await fallbackFetch(
			`http://localhost:8000/api/auth/me/password`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					newPassword: newPassword,
					password: password
				}),
			},
		);

		setAuthenticated(true);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const resetPassword = async ({ token, newPass }) => {
	const response = await fetch("http://localhost:8000/api/auth/reset-pass", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: token,
			password: newPass,
		}),
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Reset password failed.");
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
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export const useRegisterUserMutation = () => {
	return useMutation({
		mutationFn: ({ name, email, password }) =>
			registerUser({ name, email, password }),
	});
};

export const useLoginMutation = () => {
	const queryClient = useQueryClient();

	const setAuth = useProfileStore((state) => state.handleAuthenticated);

	const setLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ email, password }) => loginUser({ email, password }),
		onSuccess: (user) => {
			setAuth(true);
			setLogin(false);
			queryClient.setQueryData(["userDataFetch"], user);
		},
	});
};

export const useLogoutMutation = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => logoutUser(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["userDataFetch"] });
			setAuth(false);
		},
	});
};

export const useUpdateNameMutation = () => {
	const queryClient = useQueryClient();
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ fieldQuery }) =>
			updateName({ fieldQuery, setAuthenticated: setAuth, setLogin: setLogin }),
		onSuccess: (updatedUser) => {
			queryClient.setQueryData(["userDataFetch"], updatedUser);
		},
	});
};

export const useUpdateEmailMutation = () => {
	const queryClient = useQueryClient();
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ fieldQuery, password }) =>
			updateEmail({
				fieldQuery,
				password,
				setAuthenticated: setAuth,
				setLogin: setLogin,
			}),
		onSuccess: (updatedUser) => {
			queryClient.setQueryData(["userDataFetch"], updatedUser);
		},
	});
};

export const useUpdatePassMutation = () => {
	const queryClient = useQueryClient();
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	return useMutation({
		mutationFn: ({ newPassword, password }) =>
			updatePass({
				newPassword,
				password,
				setAuthenticated: setAuth,
				setLogin: setLogin,
			}),
		onSuccess: (updatedUser) => {
			queryClient.setQueryData(["userDataFetch"], updatedUser);
		},
	});
};

export const useForgotPassMutation = () => {
	return useMutation({
		mutationFn: ({ email }) => forgotPassword({ email }),
	});
};

export const useResetPassMutation = () => {
	return useMutation({
		mutationFn: ({ token, newPass }) => resetPassword({ token, newPass }),
	});
};
