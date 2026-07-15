import { useState, useEffect } from "react";
import { renderAutoFill } from "../api/search-api";

export const useStartQuery = () => {
	const [query, setQuery] = useState("");

	return { query, setQuery };
}

export const useEndQuery = () => {
	const [query, setQuery] = useState("");

	return { query, setQuery };
}

export const useAutoFill = (query) => {
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

			console.log(data);

			setResults(data);
		}, 500);

		return () => clearTimeout(timeout);
	}, [query]);

	return { results, setResults };
}

export const useStartCoords = () => {
	const [coords, setCoords] = useState([])

	return { coords, setCoords }
}

export const useEndCoords = () => {
	const [coords, setCoords] = useState([])

	return { coords, setCoords }
}
