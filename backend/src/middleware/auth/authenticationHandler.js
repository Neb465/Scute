import { jwtVerify } from "jose";
import { getUserByIdService } from "../../models/userModel.js";

export const authenticate = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken)
			return res.status(401).json({ msg: "No token, unauthorized to access." });

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(accessToken, accessSecret);

		if (!payload) return res.status(403).json({ msg: "You little rat." });

		const userId = payload.id;
		//fetches the database a LOT. Maybe change this by storing id, name, email, role in token.
		const user = await getUserByIdService(userId);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
};
