import { useState } from "react";

export const useProfile = () => {
  const [toggle, setToggle] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);

  return {toggle, createAcc, setToggle, setCreateAcc};
}
