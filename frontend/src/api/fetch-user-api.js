import { useQuery } from "@tanstack/react-query";
import { fetchWithToken } from "./refetch-api";
import { useProfileStore } from "../stores/useProfileStore";

const fetchUserData = async (setAuthenticated) => {
  const data = await fetchWithToken("http://localhost:8000/api/users/me", {
    method: "GET",
    credentials: "include"
  });

  setAuthenticated(true);

  return data.data;
}

export const useFetchUser = () => {
  const setAuth = useProfileStore((state) => state.handleAuthenticated);

  return useQuery({
    queryKey: ["userDataFetch"],
    queryFn: () => fetchUserData(setAuth),
    staleTime: 1000 * 60 * 5, //5 minutes
  })
}