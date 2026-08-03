import { useState } from "react";
import {
	useLogoutMutation,
	useUpdateEmailMutation,
	useUpdateNameMutation,
} from "../api/auth-api";

export const useProfile = () => {
	//local state
	const [toggle, setToggle] = useState(false);
	const [changeNameDisplay, setChangeNameDisplay] = useState(false);
	const [changeEmailDisplay, setChangeEmailDisplay] = useState(false);
	const [changeNameQuery, setChangeNameQuery] = useState("");
	const [changeEmailQuery, setChangeEmailQuery] = useState("");
	const [confirmEmailQuery, setConfirmEmailQuery] = useState("");
	const [confirmPassQuery, setConfirmPassQuery] = useState("");

	//tanstack query
	const logoutMutation = useLogoutMutation();
	const updateNameMutation = useUpdateNameMutation();
  const updateEmailMutation = useUpdateEmailMutation();

	return {
		toggle,
		changeNameDisplay,
		changeEmailDisplay,
		changeNameQuery,
		changeEmailQuery,
		confirmEmailQuery,
		confirmPassQuery,
		logoutMutation,
		updateNameMutation,
    updateEmailMutation,
		setToggle,
		setChangeNameDisplay,
		setChangeEmailDisplay,
		setChangeNameQuery,
		setChangeEmailQuery,
		setConfirmEmailQuery,
		setConfirmPassQuery,
	};
};
