import React from "react";
import { useSearchQuery } from "../api/search-api.js";
import { useSearchHook } from "../hooks/search-hook.js";
import { useMapStore } from "../stores/useMapStore.js";
import { useProfileStore } from "../stores/useProfileStore.js";

const SearchBox = ({ getRoute, isError, error }) => {
	// local states
	const startHook = useSearchHook();
	const endHook = useSearchHook();

	// global/zustand/tanstack-query states
	const startQuery = useMapStore((state) => state["start"].query);
	const startCoords = useMapStore((state) => state["start"].coords);
	const startSearch = useSearchQuery("start");
	const startAutoFillResults = startSearch.data || [];

	const endQuery = useMapStore((state) => state["end"].query);
	const endCoords = useMapStore((state) => state["end"].coords);
	const endSearch = useSearchQuery("end");
	const endAutoFillResults = endSearch.data || [];

	const handleInputChange = useMapStore((state) => state.handleInputChange);
	const handleAutoFillButton = useMapStore(
		(state) => state.handleAutoFillButton,
	);
	const handleFinalQuery = useMapStore((state) => state.handleFinalQuery);

	const profileHandleLogin = useProfileStore((state) => state.handleLogin);

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
							value={startQuery}
							onChange={(e) => handleInputChange("start", e.target.value)}
							onFocus={() => startHook.setSelected(true)}
							onBlur={() => {
								startHook.setSelected(false);
							}}
						/>

						{startHook.selected &&
							startAutoFillResults.length > 0 &&
							startAutoFillResults.map((result) => (
								<button
									key={result.display_name}
									onMouseDownCapture={(e) => {
										e.preventDefault();
										handleAutoFillButton("start", result);
									}}
									className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-1000"
								>
									{result.display_name}
								</button>
							))
						}
					</div>

					<div className="flex flex-col rounded-xl h-1/5 w-5/6 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
						<input
							type="text"
							placeholder="Choose ending point"
							className="bg-transparent outline-none w-full text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
							style={{ fontFamily: "inherit" }}
							value={endQuery}
							onChange={(e) => handleInputChange("end", e.target.value)}
							onFocus={() => endHook.setSelected(true)}
							onBlur={() => endHook.setSelected(false)}
						/>

						{endHook.selected &&
							endAutoFillResults.length > 0 &&
							endAutoFillResults.map((result) => (
								<button
									key={result.display_name}
									onMouseDownCapture={(e) => {
										e.preventDefault();
										handleAutoFillButton("end", result);
									}}
									className="bg-white hover:bg-[#F7F7F7] w-full rounded-lg px-2 py-2 my-1 text-[10px] md:text-[11px] lg:text-[12px] z-1000"
								>
									{result.display_name}
								</button>
							))
						}
					</div>

					{/* This is broken. Unsure whether you can put isError as a conditional here */}
					{isError && (
						<p className="text-red-800 mt-1 text-[9px] md:text-[11px] lg:text-[13px]">
							{error}
						</p>
					)}

					<div className="rounded-xl h-1/5 w-5/6 px-3 absolute top-27 md:top-30 lg:top-33">
						<button
							className="w-full rounded-xl py-3 text-[12px] md:text-[13px] lg:text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors"
							onClick={async () => {
								if (startCoords.length > 0 && endCoords.length > 0) {
									getRoute(startCoords, endCoords, profileHandleLogin);
									handleFinalQuery("start", startQuery);
									handleFinalQuery("end", endQuery);
								}
							}}
						>
							Calculate Route
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
