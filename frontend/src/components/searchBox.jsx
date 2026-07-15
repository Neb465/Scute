import React from "react";
import "../styles/searchbar.css";
import { useAutoFill, useEndCoords, useEndQuery, useStartCoords, useStartQuery } from "../hooks/search-hook";

const SearchBox = () => {
	const startQuery = useStartQuery();
	const endQuery = useEndQuery();
	const startResults = useAutoFill(startQuery.query);
	const endResults = useAutoFill(endQuery.query);

	const startCoords = useStartCoords();
	const endCoords = useEndCoords();

	return (
		<div
			className="relative bg-white opacity-75 hover:opacity-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.18)] w-45 md:w-60 lg:w-75 h-40 md:h-45 lg:h-50 mx-6 my-4 z-[1000]"
			style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
		>
			{/* Fields */}
			<div className="flex flex-col w-full h-full items-center mr-3">
				<div className="flex flex-col rounded-xl h-2/10 w-5/6 my-3 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
					<input
						type="text"
						placeholder="Choose starting point"
						className="bg-transparent outline-none text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
						style={{ fontFamily: "inherit" }}
						value={startQuery.query}
						onChange={(e) => {
							startQuery.setQuery(e.target.value);
							startCoords.setCoords([]);
						}}
					/>

					{startResults.results &&
						startResults.results.map((result) => (
							<div
								key={result.display_name}
								onClick={() => {
									startQuery.setQuery(result.display_name);
									startResults.setResults([]);
									startCoords.setResults([result.lon, result.lat]);
								}}
								className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-[1000]"
							>
								{result.display_name}
							</div>
						))}
				</div>

				<div className="flex flex-col rounded-xl h-2/10 w-5/6 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
					<input
						type="text"
						placeholder="Choose starting point"
						className="bg-transparent outline-none text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
						style={{ fontFamily: "inherit" }}
						value={endQuery.query}
						onChange={(e) => {
							endQuery.setQuery(e.target.value);
							endQuery.setCoords([]);
						}}
					/>

					{endResults.results &&
						endResults.results.map((result) => (
							<div
								key={result.display_name}
								onClick={() => {
									endQuery.setQuery(result.display_name);
									endResults.setResults([]);
									endCoords.setResults([result.lon, result.lat]);
								}}
								className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-[1000]"
							>
								{result.display_name}
							</div>
						))}
				</div>

				<div className="rounded-xl h-2/10 w-5/6 my-3 px-3 py-2.5">
					<button 
						className="w-full rounded-xl py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
						onClick={() => {
							{startCoords.coords && endCoords.coords && }
						}}
					>
						Calculate Route
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
