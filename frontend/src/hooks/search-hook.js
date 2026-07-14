import { useState, useEffect } from "react";
import { renderAutoFill } from "../api/search-api";

export function useStartQuery() {
	const [query, setQuery] = useState("");

	return { query, setQuery };
}

export function useEndQuery() {
	const [query, setQuery] = useState("");

	return { query, setQuery };
}


export function useAutoFill(query) {
	const [results, setResults] = useState([]);

	useEffect(() => {
		//If input is less than 3 characters, don't let autofill
		if (query.length < 3) {
			setResults([]);
			return;
		}

		// delay inbetween requests to prevent 429 errors
		const timeout = setTimeout(async () => {
			const data = await renderAutoFill(query);

			setResults(data);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query]);

	return { results, setResults };
}
