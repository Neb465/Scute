import {
	getAllUsersService,
	getUserByIdService,
} from "../models/UserModel.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await getAllUsersService();
		res.status(200).json({
			message: "Users fetched successfully",
			data: users,
		});
	} catch (e) {
		next(e);
	}
};

export const getUserById = async (req, res, next) => {
	try {
		const user = await getUserByIdService(req.params.id);

		if (!user)
			return res.status(404).json({ status: 404, message: "User not found" });

		res.status(200).json({
			message: "User fetched successfully",
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

export const getUserByAuth = async (req, res, next) => {
	try {
		const user = req.user;

		if (!user) {
			return res.status(401).json({ message: "User not authenticated" });
		}

		res.status(200).json({
			message: "User fetched successfully",
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

