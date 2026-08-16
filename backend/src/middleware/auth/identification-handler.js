import { jwtVerify } from "jose";

export const identifyUser = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			req.user = null;
			return next();
		}
			
		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(accessToken, accessSecret);

		req.user = {
			id: Number(payload.id),
			name: payload.name,
			email: payload.email,
			role: payload.role,
			sid: payload.sid
		};

		next();
	} catch (e) {
		req.user = null;
		next();
	}
};
