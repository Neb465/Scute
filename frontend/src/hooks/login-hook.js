import { useState } from "react";
import { useForgotPassMutation, useLoginMutation } from "../api/auth-api";


export const useLogin = () => {
  //local state
  const [emailField, setEmailField] = useState("");
  const [passField, setPassField] = useState("");
  
  //Tanstack query
  const loginMutation = useLoginMutation();
  const forgotPassMutation = useForgotPassMutation();

  return {
    emailField,
    passField,
    loginMutation,
    forgotPassMutation,
    setEmailField,
    setPassField,
  }
}