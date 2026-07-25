import { useState } from "react";

export function useProfile() {
  const [toggle, setToggle] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);

  return {toggle, createAcc, setToggle, setCreateAcc};
}
