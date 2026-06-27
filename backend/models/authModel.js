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
		email,
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

export const storeRefreshTokenService = async (user_id, token, expiration) => {
	db.none(
		"INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, to_timestamp($3 / 1000.0)::timestamp)",
		[user_id, token, expiration],
	);
};

export const deleteRefreshTokenService = async (user_id) => {
	db.oneOrNone("DELETE FROM refresh_tokens WHERE user_id = $1", [id]);
};
