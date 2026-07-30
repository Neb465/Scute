import { useState } from "react";
import { useRegisterUserMutation } from "../api/auth-api";

export const useCreateAcc = () => {
  //local state
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  
  //Tanstack query
  const { mutate, data, isPending, isError, error, isSuccess } = useRegisterUserMutation();

  return {
    nameField,
    emailField,
    passField,
    data,
    isError,
    error: error ? error.message : "",
    isSuccess,
    setNameField,
    setEmailField,
    setPassField,
    registerUser: (name, email, password) => mutate({ name, email, password })
  }
}