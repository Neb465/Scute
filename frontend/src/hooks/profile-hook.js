import { useState } from "react";

export const useProfile = () => {
  const [toggle, setToggle] = useState(false);

  return {toggle, setToggle};
}
