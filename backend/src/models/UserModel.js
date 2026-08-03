import db from "../config/db.js";

//main functions
export const getAllUsersService = async () => {
	const result = await db.any("SELECT id, name, email, role FROM users");
	return result;
};

export const getUserByIdService = async (id) => {
	const result = await db.oneOrNone(
		"SELECT id, name, email, role FROM users WHERE id = $1",
		[id],
	);
	return result;
};

export const createUserService = async (name, email, hashedPass) => {
	const result = await db.one(
		"INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id, name, email",
		[name, email.toLowerCase(), hashedPass],
	);
	return result;
};

export const updateUserNameService = async (id, fieldQuery) => {
	const result = await db.oneOrNone(
		"UPDATE users SET name = $2 WHERE id = $1 RETURNING id, name, email, role",
		[id, fieldQuery],
	);
	return result;
};

export const updateUserEmailService = async (id, fieldQuery) => {
	const result = await db.oneOrNone(
		"UPDATE users SET email = $2 WHERE id = $1 RETURNING id, name, email, role",
		[id, fieldQuery],
	);

	return result;
}

export const updateUserPassService = async (id, hashedPass) => {
	await db.none(
		"UPDATE users SET password = $1 WHERE id = $2",
		[hashedPass, id],
	);
};

export const deleteUserService = async (id) => {
	const result = await db.oneOrNone(
		"DELETE FROM users WHERE id = $1 RETURNING id, name, email",
		[id],
	);

	return result;
};
