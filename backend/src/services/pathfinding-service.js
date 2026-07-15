//Constants 

const ASTAR_URL = process.env.ASTAR_URL || "http://localhost:5001";

export const findPath = async (req, res, next) => {
  const { start, goal } = req.body;
  try {
    const path = await fetch(`${ASTAR_URL}/astar`, {
      method: "POST",
      headers: { "Content-Type ": "application/json"},
      body: JSON.stringify({ start, goal })
    });

    if (!path.ok) {
      return res.status(path.status).json({msg: "Pathfinding service error"});
    }

    return res.status(200).json(path.json());
  } catch (e) {
    next(e);
  }
}