import bcrypt from "bcrypt";
import crypto from "crypto";
import ms from "ms";
import nodemailer from "nodemailer";
import {
	deleteAllRefreshTokenService,
	deletePassResetService,
	deleteRefreshTokenService,
	getPassResetService,
	getPasswordByIdService,
	getUserByEmailService,
	getUserByRefreshTokenService,
	storePassResetService,
	storeRefreshTokenService,
	createUserService,
	deleteUserService,
	updateUserEmailService,
	updateUserNameService,
	updateUserPassService,
} from "../models/AuthModel.js";
import { jwtVerify, SignJWT } from "jose";

export const registerUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(password, saltRounds);

		const registeredUser = await createUserService(name, email, hashedPass);

		res.status(201).json({
			message: "User registered successfully",
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
			return res.status(404).json({ message: "User not found" });
		}

		const hashedPass = user.password;

		if (!hashedPass) {
			return res
				.status(404)
				.json({ message: "Hashed password not found in database" });
		}

		const isPassValid = await bcrypt.compare(password, hashedPass);

		if (!isPassValid) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const refreshSecret = new TextEncoder().encode(
			process.env.JWT_REFRESH_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		const refreshToken = await new SignJWT({ id: user.id })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_REFRESH_EXPIRATION || "7d")
			.sign(refreshSecret);

		const hashedRefreshToken = await crypto
			.createHash("sha256")
			.update(refreshToken)
			.digest("hex");

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: ms("7d"),
		});

		await storeRefreshTokenService(
			user.id,
			hashedRefreshToken,
			new Date(Date.now() + ms("7d")),
		);

		return res.status(200).json({
			message: "Logged in successfully",
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
		const refreshToken = req.cookies.refreshToken;

		const hashedToken = await crypto
			.createHash("sha256")
			.update(refreshToken)
			.digest("hex");

		const refreshSecret = new TextEncoder().encode(
			process.env.JWT_REFRESH_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(refreshToken, refreshSecret);
		const userId = payload.id;

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		await deleteRefreshTokenService(userId, hashedToken);

		return res.status(200).json({
			message: "Logged out successfully",
		});
	} catch (e) {
		next(e);
	}
};

export const updateUserName = async (req, res, next) => {
	const { fieldQuery } = req.body;

	try {
		const user = req.user;

		if (user.name === fieldQuery) {
			return res.status(400).json({
				message: "New name cannot be the same as the old name!",
			});
		}

		const updatedUser = await updateUserNameService(user.id, fieldQuery);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		res.status(200).json({
			message: "User updated successfully",
			data: updatedUser,
		});
	} catch (e) {
		next(e);
	}
};

export const updateUserEmail = async (req, res, next) => {
	const { fieldQuery } = req.body;

	try {
		const user = req.user;

		if (user.email === fieldQuery) {
			return res.status(400).json({
				message: "New email cannot be the same as the old email!",
			});
		}

		const updatedUser = await updateUserEmailService(user.id, fieldQuery);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		res.status(200).json({
			message: "User updated successfully",
			data: updatedUser,
		});
	} catch (e) {
		next(e);
	}
};

export const updateUserPassword = async (req, res, next) => {
	const { newPassword } = req.body;

	try {
		//user should be auth by now
		const user = req.user;

		const oldHashedPass = await getPasswordByIdService(user.id);

		if (await bcrypt.compare(newPassword, oldHashedPass.password)) {
			return res.status(400).json({
				message: "New password cannot be the same as the old password!",
			});
		}

		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(newPassword, saltRounds);
		await updateUserPassService(user.id, hashedPass);

		//invalidate all sessions, including the current one
		await deleteAllRefreshTokenService(user.id);
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(200).json({ message: "Password updated successfully" });
	} catch (e) {
		next(e);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const user = req.user;

		//delete user
		const deletedUser = await deleteUserService(user.id);

		if (!deletedUser)
			return res.status(404).json({ message: "User not found" });

		//remove all sessions, including the current one
		//remove password reset attempts (if available)
		await deleteAllRefreshTokenService(user.id);
		await deletePassResetService(user.id);
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(200).json({
			message: "User deleted successfully",
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
			return res.status(403).json({ message: "No refresh token" });
		}

		//first part of auth, jwtVerify
		const refreshSecret = new TextEncoder().encode(
			process.env.JWT_REFRESH_TOKEN_SECRET,
		);

		const { payload } = await jwtVerify(refreshToken, refreshSecret);

		const hashedRefreshToken = await crypto
			.createHash("sha256")
			.update(refreshToken)
			.digest("hex");

		//second part of auth, checking db
		const user = await getUserByRefreshTokenService(hashedRefreshToken);

		if (!user) {
			return res.status(403).json({ message: "Refresh tokens don't match" });
		}

		//check if refresh token expired
		const expired = new Date() > user.expires_at;

		if (expired) {
			await deleteRefreshTokenService(user.user_id, hashedRefreshToken);

			res.clearCookie("accessToken");
			res.clearCookie("refreshToken");
			return res.status(403).json({ message: "Refresh token expired" });
		}

		const accessSecret = new TextEncoder().encode(
			process.env.JWT_ACCESS_TOKEN_SECRET,
		);

		const accessToken = await new SignJWT({
			id: user.user_id,
			name: user.name,
			email: user.email,
			role: user.role,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(process.env.JWT_ACCESS_EXPIRATION || "1h")
			.sign(accessSecret);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: ms("1h"),
		});

		return res.status(200).json({
			message: "Cookie refreshed successfully",
			data: {
				id: user.user_id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (e) {
		next(e);
	}
};

export const forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await getUserByEmailService(email);

		if (!user) {
			return res.status(404).json({
				message:
					"User not found.",
			});
		}

		const token = crypto.randomBytes(32).toString("hex");
		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		await deletePassResetService(user.id);

		await storePassResetService(
			user.id,
			hashedToken,
			new Date(Date.now() + ms("1h")),
		);

		//*IMPORTANT* Change reset url to actual website's reset user page.
		const resetUrl = `http://localhost:5173/resetPass?token=${token}`;

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT || 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: '"UMaps" <do-not-respond@umaps.com>',
			to: email,
			subject: "Password Reset Request",
			html: `
				<p>You requested a password reset.</p>
				<p><a href="${resetUrl}">Click here to reset your password</a></p>
				<p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
			`,
		});

		res.status(200).json({
			message:
				"If an account with that email exists, a password reset link has been sent.",
		});
	} catch (e) {
		next(e);
	}
};

//ensure user cannot use the same password
export const resetPassword = async (req, res, next) => {
	//both checked in inputvalidators
	const { password, token } = req.body;
	try {
		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

		const user = await getPassResetService(hashedToken);
		if (!user) {
			return res
				.status(404)
				.json({ message: "User password reset request not found in database" });
		}

		//check if refresh token expired
		const expired = new Date() > user.expires_at;

		if (expired) {
			await deletePassResetService(user.user_id);

			return res.status(401).json({ message: "Password reset token expired" });
		}

		if (hashedToken !== user.token_hash) {
			return res
				.status(401)
				.json({ message: "Input token and database token don't match" });
		}

		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(password, saltRounds);

		const oldHashedPass = await getPasswordByIdService(user.user_id);

		if (await bcrypt.compare(password, oldHashedPass.password)) {
			return res
				.status(400)
				.json({
					message: "New password cannot be the same as the old password!",
				});
		}

		await updateUserPassService(user.user_id, hashedPass);

		await deletePassResetService(user.user_id);
		await deleteAllRefreshTokenService(user.user_id);

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(200).json({ message: "User updated successfully" });
	} catch (e) {
		next(e);
	}
};
