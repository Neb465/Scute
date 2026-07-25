import { useSearchQuery } from "../api/search-api";
import { useMapStore } from "../stores/useMapStore";

export const SearchQuery = (type) => {
  const query = useMapStore((state) => state[type].query);
  const handleInputChange = useMapStore((state) => state.handleInputChange);
  
  const {data: result = [], isError, error} = useSearchQuery(type);

  return (
    <div className="flex flex-col rounded-xl h-1/5 w-5/6 my-3 px-3 py-1.5 md:py-2 lg:py-2.5 bg-[#f1f3f4] hover:bg-[#f4f5f6]">
      <input
        type="text"
        placeholder="Choose starting point"
        className="bg-transparent outline-none w-full text-[#202124] placeholder-[#9aa0a6] text-[12px] md:text-[13px] lg:text-[14px]"
        style={{ fontFamily: "inherit" }}
        value={query}
        onChange={(e) => handleInputChange(type, e.target.value)}
        onFocus={() => startSearch.handleSelect(true)}
        onBlur={() => {
          startSearch.handleSelect(false);
        }}
      />
    </div>
  );
}