import db from "../config/db.js";

//main functions
export const getAllUsersService = async () => {
	const result = await db.any("SELECT id, name, email, role FROM users");
	return result;
};

export const getUserByIdService = async (id) => {
	const result = await db.oneOrNone(
		"SELECT id, name, email, role FROM users where id = $1",
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

export const updateUserService = async (id, name, email) => {
	const result = await db.oneOrNone(
		"UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
		[name, email.toLowerCase(), id],
	);
	return result;
};

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
