export const authenticate = async (req, res, next) => {
  if (!req.user){
    return res.status(401).json({ message: "Unauthenticated. Please login." });
  }
  next();
}