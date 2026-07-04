import React from "react";
import "../styles/searchbar.css";

const SearchBar = () => {
	return (
		<div
			className="relative bg-white opacity-75 hover:opacity-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.18)] w-45 md:w-60 lg:w-75 h-40 md:h-45 lg:h-50 mx-6 my-4 z-[1000]"
			style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
		>
      {/* Fields */}
			<div className="flex flex-col w-full h-full items-center mr-3">
        <div className= "flex items-center rounded-xl h-2/10 w-5/6 my-3 px-3 py-2.5 bg-[#f1f3f4]">
          <input
            type="text"
            placeholder="Choose starting point"
            className="flex-1 bg-transparent outline-none text-[#202124] placeholder-[#9aa0a6] text-[14px]"
            style={{ fontFamily: "inherit" }}
          />
        </div>

        <div className= "flex items-center rounded-xl h-2/10 w-5/6 px-3 py-2.5 bg-[#f1f3f4]">
          <input
            type="text"
            placeholder="Choose destination"
            className="flex-1 bg-transparent outline-none text-[#202124] placeholder-[#9aa0a6] text-[14px]"
            style={{ fontFamily: "inherit" }}
          />
        </div>

        <div className= "rounded-xl h-2/10 w-5/6 my-3 px-3 py-2.5">
          <button className="w-full rounded-xl py-3 text-[14px] font-medium bg-[#1a73e8] text-white hover:bg-[#1765cc] transition-colors">
            Calculate Route
          </button>
        </div>

      </div>
		</div>
	);
};

export default SearchBar;
