import { useMutation } from "@tanstack/react-query";

const loginUser = async ({ name, email, password }) => {
	const response = await fetch("http://localhost:8000/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
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

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: ({ email, password }) => loginUser({ email, password }),
	});
};

export const useForgotPassMutation = () => {
	return useMutation({
		mutationFn: ({ email }) => forgotPassword({ email }),
	});
};
