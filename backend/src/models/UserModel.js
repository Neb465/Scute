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

