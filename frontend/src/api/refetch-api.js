export const fetchWithToken = async (url, options) => {
  options.credentials = "include";

  let response = await fetch(url, options);

	//code for refreshing
	if(response.status === 401){
    const refetch = await fetch(
      "http://localhost:8000/api/auth/refresh", {
        method: "POST",
        credentials: "include"
      }
    );

    //*DOLATER* send user to login
    if(refetch.status === 403){
      throw new Error("Session expired. Re-login.");
    }

    if(refetch.ok) {
      response = await fetch(url, options);
    }
  }

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Failed to fetch");
	}

  return data;
}