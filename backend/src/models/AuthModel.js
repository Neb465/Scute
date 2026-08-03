import db from "../config/db.js";

export const getPasswordByIdService = async (id) => {
	const result = await db.oneOrNone(
		"SELECT password FROM users WHERE id = $1",
		[id],
	);
	return result;
};

export const getUserByEmailService = async (email) => {
	const result = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
		email.toLowerCase(),
	]);
	return result;
};

export const getUserByRefreshTokenService = async (tokenHash) => {
	const result = await db.oneOrNone(
		"SELECT rt.expires_at, u.id AS user_id, u.name, u.email, u.role FROM refresh_tokens rt INNER JOIN users u ON rt.user_id = u.id WHERE rt.token_hash = $1",
		[tokenHash],
	);
	return result;
};

export const storeRefreshTokenService = async (
	user_id,
	tokenHash,
	expiration,
) => {
	await db.none(
		"INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
		[user_id, tokenHash, expiration],
	);
};

export const deleteRefreshTokenService = async (user_id, token_hash) => {
	await db.oneOrNone("DELETE FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2", [user_id, token_hash]);
};

export const deleteAllRefreshTokenService = async (user_id) => {
	await db.oneOrNone("DELETE FROM refresh_tokens WHERE user_id = $1", [user_id]);
};

export const storePassResetService = async (user_id, tokenHash, expiration) => {
	await db.none(
		"INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
		[user_id, tokenHash, expiration],
	);
};

export const getPassResetService = async (hashedToken) => {
	const result = await db.oneOrNone(
		"SELECT * FROM password_resets WHERE token_hash = $1",
		[hashedToken],
	);
	return result;
};

export const deletePassResetService = async (user_id) => {
	await db.oneOrNone("DELETE FROM password_resets WHERE user_id = $1", [
		user_id,
	]);
};
