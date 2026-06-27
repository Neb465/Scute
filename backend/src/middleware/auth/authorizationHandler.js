export const authorizeWithId = (allowedRoles) => {
	return async (req, res, next) => {
		try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ msg: "User not authenticated" });
      }

      //Simple form of row level security
			if (user.id !== parseInt(req.params.id) && user.role !== "admin") {
				return res.status(403).json({ msg: "Unauthorized access" });
			}

			if (!allowedRoles.includes(req.user.role)) {
				return res.status(403).json({ msg: "Unauthorized access" });
			}
			next();
		} catch (e) {
			next(e);
		}
	};
};

export const authorizeWithoutId = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ msg: "User not authenticated" });
      }


      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ msg: "Unauthorized access" });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}


