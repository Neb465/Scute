import { useState } from "react";
import { useLogoutMutation } from "../api/auth-api";

export const useProfile = () => {
  //local state
  const [toggle, setToggle] = useState(false);

  //tanstack query
  const logoutMutation = useLogoutMutation();

  return {toggle, logoutMutation, setToggle};
}
