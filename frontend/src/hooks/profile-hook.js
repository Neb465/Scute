import { useState } from "react";
import {
	useDeleteUserMutation,
	useLogoutMutation,
	useUpdateEmailMutation,
	useUpdateNameMutation,
  useUpdatePassMutation,
} from "../api/auth-api";

export const useProfile = () => {
	//local state
	const [toggle, setToggle] = useState(false);

	const [nameIsEditing, setNameisEditing] = useState(false);
	const [emailIsEditing, setEmailIsEditing] = useState(false);
  const [passIsEditing, setPassIsEditing] = useState(false);

	const [nameEditingQuery, setNameEditingQuery] = useState("");
	const [emailEditingQuery, setEmailEditingQuery] = useState("");
  const [passEditingQuery, setPassEditingQuery] = useState("");

	const [confirmEmailQuery, setConfirmEmailQuery] = useState("");
	const [confirmPassQuery, setConfirmPassQuery] = useState("");
  const [confirmDeleteQuery, setConfirmDeleteQuery] = useState("");

	//tanstack query
	const logoutMutation = useLogoutMutation();
	const updateNameMutation = useUpdateNameMutation();
  const updateEmailMutation = useUpdateEmailMutation();
  const updatePassMutation = useUpdatePassMutation();
	const deleteUserMutation = useDeleteUserMutation();

	return {
		toggle,
		nameIsEditing,
		emailIsEditing,
    passIsEditing,
		nameEditingQuery,
		emailEditingQuery,
    passEditingQuery,
		confirmEmailQuery,
		confirmPassQuery,
    confirmDeleteQuery,
		logoutMutation,
		updateNameMutation,
    updateEmailMutation,
    updatePassMutation,
		deleteUserMutation,
		setToggle,
		setNameisEditing,
		setEmailIsEditing,
    setPassIsEditing,
		setNameEditingQuery,
		setEmailEditingQuery,
    setPassEditingQuery,
		setConfirmEmailQuery,
		setConfirmPassQuery,
    setConfirmDeleteQuery,
	};
};
