import { jwtVerify } from "jose";

export const authenticate = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken)
			return res.status(401).json({ message: "Unauthenticated. Please login." });

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(accessToken, accessSecret);

		req.user = {
			id: Number(payload.id),
			name: payload.name,
			email: payload.email,
			role: payload.role,
		};

		next();
	} catch (e) {
		next(e);
	}
};
