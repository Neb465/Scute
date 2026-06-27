import bcrypt from "bcrypt";
import ms from "ms";
import { createUserService } from "../models/userModel.js";
import {
	deleteRefreshTokenService,
	getUserByEmailService,
	getUserByRefreshTokenService,
	storeRefreshTokenService,
} from "../models/authModel.js";
import { jwtVerify, SignJWT } from "jose";

export const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(password, saltRounds);

		const registeredUser = await createUserService(name, email, hashedPass);

		res.status(201).json({
			msg: "User registered successfully",
			data: registeredUser,
		});
	} catch (e) {
		next(e);
	}
};

export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await getUserByEmailService(email);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		const hashedPass = user.password;

		if (!hashedPass) {
			return res
				.status(404)
				.json({ msg: "Hashed password not found in database" });
		}

		const isPassValid = await bcrypt.compare(password, hashedPass);

		if (!isPassValid) {
			return res.status(401).json({ msg: "Incorrect password" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const refreshSecret = new TextEncoder().encode(
			process.env.JWT_REFRESH_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({ id: user.id, role: user.role })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		const refreshToken = await new SignJWT({ id: user.id, role: user.role })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_REFRESH_EXPIRATION || "7d")
			.sign(refreshSecret);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: ms("7d"),
			path: "/api/auth/refresh",
		});

		await storeRefreshTokenService(
			user.id,
			req.cookies.refreshToken,
			Date.now() + ms("7d"),
		);

		return res.status(200).json({
			msg: "Logged in successfully",
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (e) {
		next(e);
	}
};

export const logoutUser = async (req, res, next) => {
	try {
		const userId = req.cookies.refreshToken.id;
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		await deleteRefreshTokenService(userId);

		return res.status(200).json({
			msg: "Logged out successfully",
		});
	} catch (e) {
		next(e);
	}
};

/*
Handle expiry on the client side When a request fails with a 401, 
your frontend should automatically call /auth/refresh to get a new access token, 
then retry the original request. If the refresh also fails (token expired or not found),
redirect the user to login. 
This is typically done with an HTTP interceptor (in axios) or a wrapper around fetch.
*/
export const refreshUser = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ msg: "No refresh token" });
		}

		//first part of auth, jwtVerify
		const refreshSecret = new TextEncoder().encode(
			process.env.JWT_REFRESH_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(refreshToken, refreshSecret);

		if (!payload) return res.status(403).json({ msg: "You little rat." });

		//second part of auth, checking db
		const user = await getUserByRefreshTokenService(refreshToken);

		if (!user) {
			return res.status(403).json({ msg: "Refresh tokens don't match" });
		}

		const expired = Date.now() - user.expires_at;

		if (expired >= 0) {
			await deleteRefreshTokenService(user.user_id);

			res.clearCookie("accessToken");
			res.clearCookie("refreshToken");
			return res.status(403).json({ msg: "Refresh token expired" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({ id: user.user_id, role: user.role })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		return res.status(200).json({
			msg: "Cookie refreshed successfully",
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (e) {
		next(e);
	}
};
