import React from "react";
import { useMap } from "react-leaflet";


const SearchBox = ({ routeButton, startSearch, endSearch }) => {
	const map = useMap();

	return (
		<div className="flex flex-col h-full w-45 md:w-60 lg:w-75 mx-6 my-4">
			<div
				className="relative bg-white opacity-75 hover:opacity-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.18)] w-full h-40 md:h-45 lg:h-50 z-1000"
				style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
			>
				{/* Fields */}
				<div className="flex flex-col w-full h-full items-center mr-3">
					<div className="flex flex-col rounded-xl h-1/5 w-5/6 my-3 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
						<input
							type="text"
							placeholder="Choose starting point"
							className="bg-transparent outline-none w-full text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
							style={{ fontFamily: "inherit" }}
							value={startSearch.query}
							onChange={startSearch.handleInputChange}
							onFocus={() => startSearch.handleSelect(true)}
							onBlur={() => {
								startSearch.handleSelect(false);
							}}
						/>
					</div>

					<div className="flex flex-col rounded-xl h-1/5 w-5/6 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
						<input
							type="text"
							placeholder="Choose ending point"
							className="bg-transparent outline-none w-full text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
							style={{ fontFamily: "inherit" }}
							value={endSearch.query}
							onChange={endSearch.handleInputChange}
							onFocus={() => endSearch.handleSelect(true)}
							onBlur={() => endSearch.handleSelect(false)}
						/>
					</div>

					{routeButton.error && (
						<p className="text-red-800 mt-1 text-[9px] md:text-[11px] lg:text-[13px]">
							{routeButton.error}
						</p>
					)}

					<div className="rounded-xl h-1/5 w-5/6 px-3 absolute top-27 md:top-30 lg:top-33">
						<button
							className="w-full rounded-xl py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
							onClick={async () => {
								if(startSearch.coords && endSearch.coords) {
									await routeButton.getRoute(startSearch.coords, endSearch.coords);
									startSearch.handleFinalQuery();
									endSearch.handleFinalQuery();
								}
							}}
						>
							Calculate Route
						</button>
					</div>
				</div>

				{startSearch.selected &&
					startSearch.results.length > 0 &&
					startSearch.results.map((result) => (
						<button
							key={result.display_name}
							onMouseDownCapture={(e) => {
								e.preventDefault();
								startSearch.handleAutoFillButton(result);
							}}
							className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-1000"
						>
							{result.display_name}
						</button>
					))}

				{endSearch.selected &&
					endSearch.results.length > 0 &&
					endSearch.results.map((result) => (
						<button
							key={result.display_name}
							onMouseDownCapture={(e) => {
								e.preventDefault();
								endSearch.handleAutoFillButton(result);
							}}
							className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-1000"
						>
							{result.display_name}
						</button>
					))}
			</div>
		</div>
	);
};

export default SearchBox;
