import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserByIdService,
	updateUserService,
	updateUserPassService
} from "../models/user-model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await getAllUsersService();
		res.status(200).json({
			msg: "Users fetched successfully",
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
			return res.status(404).json({ status: 404, msg: "User not found" });

		res.status(200).json({
			msg: "User fetched successfully",
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

//currently the only function with password validation. Maybe change in the future
export const updateUser = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const updatedUser = await updateUserAllService(req.params.id, name, email);

		if (!updatedUser) {
			return res.status(404).json({ msg: "User not found" });
		}

		res.status(200).json({
			msg: "User updated successfully",
			data: updatedUser,
		});
	} catch (e) {
		next(e);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const deletedUser = await deleteUserService(req.params.id);

		if (!deletedUser) return res.status(404).json({ msg: "User not found" });

		res.status(200).json({
			msg: "User deleted successfully",
			data: deletedUser,
		});
	} catch (e) {
		next(e);
	}
};
