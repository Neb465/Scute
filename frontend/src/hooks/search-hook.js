import { useState } from "react";


export const useSearchHook = () => {
	const [selected, setSelected] = useState(false);

	return {selected, setSelected}
}