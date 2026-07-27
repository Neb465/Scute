import { jwtVerify } from "jose";
import { getUserByIdService } from "../../models/UserModel.js";

export const authenticate = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		//FRONTEND SHOULD CHECK FOR 401 STATUS AND REROUTE USER TO LOGIN
		if (!accessToken)
			return res.status(401).json({ message: "No token, unauthorized to access. Please login." });

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(accessToken, accessSecret);

		const userId = payload.id;
		//fetches the database a LOT. Maybe change this by storing id, name, email, role in token.
		const user = await getUserByIdService(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
};
