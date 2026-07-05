import { useState } from "react";

export function useButton() {
  const [toggle, setToggle] = useState(false)

  return {toggle, setToggle}
}
