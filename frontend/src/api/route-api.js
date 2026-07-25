import { useMutation, QueryClient } from "@tanstack/react-query";

const fetchRoute = async ({ start, goal }) => {
  // const startFloat = [parseFloat(start[0]), parseFloat(start[1])];
  // const goalFloat = [parseFloat(goal[0]), parseFloat(goal[1])];

  const response = await fetch(
    "http://localhost:8000/api/astar",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        start: start,
        goal: goal
      })
    }
  )

  //console.log(response);
    
  const data = await response.json();
  // const body = await response.text();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch route");
  }

  // console.log(start);
  // console.log(goal);
  return data.path;
} 

export const useRouteMutation = () => {
  return useMutation({
    mutationFn: fetchRoute
  })
}