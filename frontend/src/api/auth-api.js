import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../stores/useProfileStore";
import { csrfToken } from "../stores/useCsrfStore";
import { fallbackFetch } from "./fallback-fetch-api";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const handleSessionError = (e, setAuthenticated, setLogin) => {
	if (e.status === 403) {
		setAuthenticated(false);
		setLogin(true);
	}
};

const fetchUserData = async (setAuthenticated, setLogin) => {
	try {
		const data = await fallbackFetch(`${API_URL}/api/users/me`, {
			method: "GET",
		});

		return data.data;
	} catch (e) {
		throw e;
	}
};

const registerUser = async ({ name, email, password }) => {
	const response = await fetch(`${API_URL}/api/auth/register`, {
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

//cannot use fallbackfetch because user isn't authenticated at this point
const loginUser = async ({ name, email, password }) => {
	const response = await fetch(`${API_URL}/api/auth/login`, {
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

	csrfToken.set(data.data.csrfToken);

	return data.data;
};

//cannot use fallbackfetch because user login state should still be wiped even if auth somehow fails
//(e.g. access token runs out and the user tries logging out)
const logoutUser = async () => {
	const response = await fetch(`${API_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Logout account failed.");
	}

	csrfToken.clear();

	return data.message;
};

const forgotPassword = async ({ email }) => {
	const response = await fetch(`${API_URL}/api/auth/forgot-pass`, {
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

const resetPassword = async ({ token, newPass }) => {
	const response = await fetch(`${API_URL}/api/auth/reset-pass`, {
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

const updateName = async ({ fieldQuery, setAuthenticated, setLogin }) => {
	try {
		const xsrfToken = csrfToken.get();

		const data = await fallbackFetch(`${API_URL}/api/auth/me/name`, {
			method: "PUT",
			headers: { 
				"Content-Type": "application/json",
				"x-csrf-token": xsrfToken
			},
			body: JSON.stringify({
				fieldQuery: fieldQuery,
			}),
		});

		csrfToken.set(data.data.csrfToken);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const updateEmail = async ({
	fieldQuery,
	password,
	setAuthenticated,
	setLogin,
}) => {
	try {
		const xsrfToken = csrfToken.get();
		
		const data = await fallbackFetch(
			`${API_URL}/api/auth/me/email`,
			{
				method: "PUT",
				headers: { 
					"Content-Type": "application/json",
					"x-csrf-token": xsrfToken
				},
				body: JSON.stringify({
					fieldQuery: fieldQuery,
					password: password,
				}),
			},
		);

		csrfToken.set(data.data.csrfToken);

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const updatePass = async ({
	newPassword,
	password,
	setAuthenticated,
	setLogin,
}) => {
	try {
		const xsrfToken = csrfToken.get();

		const data = await fallbackFetch(
			`${API_URL}/api/auth/me/password`,
			{
				method: "PUT",
				headers: { 
					"Content-Type": "application/json",
					"x-csrf-token": xsrfToken
				},
				body: JSON.stringify({
					newPassword: newPassword,
					password: password,
				}),
			},
		);

		csrfToken.clear();

		return data.data;
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

const deleteUser = async ({ password, setAuthenticated, setLogin }) => {
	try {
		const xsrfToken = csrfToken.get();

		const data = await fallbackFetch(
			`${API_URL}/api/auth/me`,
			{
				method: "DELETE",
				headers: { 
					"Content-Type": "application/json",
					"x-csrf-token": xsrfToken
				},
				body: JSON.stringify({
					password: password,
				}),
			},
		);

		csrfToken.clear();
	} catch (e) {
		handleSessionError(e, setAuthenticated, setLogin);
		throw e;
	}
};

export const useFetchUser = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);

	const query = useQuery({
		queryKey: ["userDataFetch"],
		queryFn: () => fetchUserData(setAuth, setLogin),
		staleTime: 1000 * 60 * 5, //5 minutes
		refetchOnWindowFocus: false,
		retry: false,
	});

	useEffect(() => {
		if (query.isSuccess && query.data) {
      setAuth(true);
    }
    
    // Case 2: Fetch failed (User logged out / 403)
    if (query.isError) {
      const errorStatus = query.error?.status;
      
      if (errorStatus === 403) {
        setAuth(false);
        setLogin(true); // Directs them to login layout safely
      }
    }
	}, [query.data, query.isSuccess, query.isError, query.error, setAuth, setLogin]);

	return query;
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
			const { csrfToken, ...userData } = user; 
			setAuth(true);
			setLogin(false);
			queryClient.setQueryData(["userDataFetch"], userData);
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
			const { csrfToken, ...userData } = updatedUser; 
			queryClient.setQueryData(["userDataFetch"], userData);
		},
	});
};

export const useUpdateEmailMutation = () => {
	const queryClient = useQueryClient();
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);
	const setEmailIsEditing = useProfileStore(
		(state) => state.handleEmailIsEditing,
	);

	return useMutation({
		mutationFn: ({ fieldQuery, password }) =>
			updateEmail({
				fieldQuery,
				password,
				setAuthenticated: setAuth,
				setLogin: setLogin,
			}),
		onSuccess: (updatedUser) => {
			const { csrfToken, ...userData } = updatedUser; 
			queryClient.setQueryData(["userDataFetch"], userData);
			setEmailIsEditing(false);
		},
	});
};

export const useUpdatePassMutation = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);
	const setPassIsEditing = useProfileStore(
		(state) => state.handlePassIsEditing,
	);

	return useMutation({
		mutationFn: ({ newPassword, password }) =>
			updatePass({
				newPassword,
				password,
				setAuthenticated: setAuth,
				setLogin: setLogin,
			}),
		onSuccess: () => {
			setPassIsEditing(false);
			setAuth(false);
			setLogin(true);
		},
	});
};

export const useDeleteUserMutation = () => {
	const setAuth = useProfileStore((state) => state.handleAuthenticated);
	const setLogin = useProfileStore((state) => state.handleLogin);
	const setCreateAcc = useProfileStore((state) => state.handleCreateAcc);
	const setPassIsEditing = useProfileStore(
		(state) => state.handleDeleteUserIsEditing,
	);

	return useMutation({
		mutationFn: ({ password }) =>
			deleteUser({
				password,
				setAuthenticated: setAuth,
				setLogin: setLogin,
			}),
		onSuccess: () => {
			setPassIsEditing(false);
			setAuth(false);
			setCreateAcc(true);
		},
	});
}

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
