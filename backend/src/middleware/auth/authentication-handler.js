import { jwtVerify } from "jose";
import { getUserByIdService } from "../../models/UserModel.js";

export const authenticate = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		//FRONTEND SHOULD CHECK FOR 401 STATUS AND REROUTE USER TO LOGIN
		if (!accessToken)
			return res.status(401).json({ message: "Unauthenticated. Please login." });

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(accessToken, accessSecret);

		//fetches the database a LOT. Maybe change this by storing id, name, email, role in token.
		const user = {id: payload.id, name: payload.name, email: payload.email, role: payload.role}

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
};
