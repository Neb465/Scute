import { useMutation } from "@tanstack/react-query";

const registerUser = async ({ name, email, password}) => {
  const response = await fetch(
    "http://localhost:8000/api/auth/register",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }
  )

  const data = await response.json();

  if (!response.ok) {
		throw new Error(data.message || "Create account failed");
	}

  return data.data;
}

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: ({ name, email, password }) => registerUser({ name, email, password })
  })
}