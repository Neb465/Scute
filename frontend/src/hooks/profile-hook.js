import { useState } from "react";

export const useProfile = () => {
  const [toggle, setToggle] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);
  const [login, setLogin] = useState(false);

  return {toggle, createAcc, login, setToggle, setCreateAcc, setLogin};
}
