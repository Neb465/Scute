import { useState, useRef } from "react";
import { renderAutoFill } from "../api/search-api";

export const useSearch = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [coords, setCoords] = useState([]);
	const [selected, setSelected] = useState(false);
	const [finalQuery, setFinalQuery] = useState("");
	const searchTimeout = useRef(null);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		setCoords([]);

		if (searchTimeout.current) {
			clearTimeout(searchTimeout.current);
		}

		if (value.length < 3) {
			setResults([]);
			return;
		}

		searchTimeout.current = setTimeout(async () => {
			const data = await renderAutoFill(value);
			setResults(data);
		}, 500);
	}

	const handleAutoFillButton = (result) => {
		setQuery(result.display_name);
		setCoords([parseFloat(result.lon), parseFloat(result.lat)]); 
		setResults([]); 
	}

	const handleSelect = (bool) => {
		setSelected(bool);
	}

	const handleFinalQuery = () => {
		setFinalQuery(query);
	}

	return {
		finalQuery, query, results, coords, selected, handleAutoFillButton, handleInputChange, handleSelect, handleFinalQuery
	}

	// useEffect(() => {
	// 	//If input is less than 3 characters, don't let autofill
	// 	if (query.length < 3) {
	// 		setResults([]);
	// 		return;
	// 	}

	// 	// delay inbetween requests to prevent 429 errors
	// 	const timeout = setTimeout(async () => {
	// 		const data = await renderAutoFill(query);

	// 		setResults(data);
	// 	}, 500);

	// 	return () => clearTimeout(timeout);
	// }, [query]);

	// return { results, setResults };
}