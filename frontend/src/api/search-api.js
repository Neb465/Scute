import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMapStore } from "../stores/useMapStore";
import { useProfileStore } from "../stores/useProfileStore";

const useDebounce = (value) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return debounceValue;
}

const renderAutoFill = async (query) => {
  let response = await fetch(
    "http://localhost:8000/api/geocode?" +
    new URLSearchParams({
      q: query,
    }),
  );

  const data = await response.json();

  return data;
}

export const useSearchQuery = (type) => {
  const query = useMapStore((state) => state[type].query);
  const autoFillCanDisplay = useMapStore((state) => state[type].autoFillCanDisplay);

  const debounceQuery = useDebounce(query);

  return useQuery({
    queryKey: ['searchAutoFill', type, debounceQuery],
    queryFn: () => renderAutoFill(debounceQuery),
    enabled: debounceQuery.length >= 3 && autoFillCanDisplay,
    //cache for 10 minutes
    staleTime: 1000 * 60 * 10
  })
}