import { useSearchParams } from "react-router";
import { useResetPassMutation } from "../api/auth-api";
import { useState } from "react";

export const useResetPass = () => {
	const [searchParams] = useSearchParams();
  const [newPass, setNewPass] = useState("");

	const token = searchParams.get("token");

	//Tanstack query
	const { mutate, data, isPending, isError, error, isSuccess} =
		useResetPassMutation();

	return {
		token: token,
    newPass,
		data,
		isPending,
		isError,
		error: error ? error.message : "",
		isSuccess,
    setNewPass,
		resetPass: () => mutate({ token, newPass }),
	};
};
