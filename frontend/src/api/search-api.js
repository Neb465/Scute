export const renderAutoFill = async (query) => {
  const response = await fetch(
    "http://localhost:8000/api/geocode?" +
      new URLSearchParams({
        q: query,
      }),
  );

  return response.json();
}