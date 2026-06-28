import db from "../config/db.js";

//main functions
export const getAllUsersService = async () => {
	const result = await db.any("SELECT id, name, email, role FROM users");
	return result;
};

export const getUserByIdService = async (id) => {
	const result = await db.one("SELECT id, name, email, role FROM users where id = $1", [id]);
	return result;
};

export const createUserService = async (name, email, hashedPass) => {
	const result = await db.one(
		"INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id, name, email",
		[name, email, hashedPass],
	);
	return result;
};

export const updateAllUserInfoService = async (id, name, email) => {
	const result = await db.oneOrNone(
		"UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email",
		[name, email, id],
	);
	return result;
};



export const deleteUserService = async (id) => {
	const result = await db.oneOrNone(
		"DELETE FROM users WHERE id = $1 RETURNING id, name, email",
		[id],
	);

	return result;
};
