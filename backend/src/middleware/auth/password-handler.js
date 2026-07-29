import bcrypt from "bcrypt";
import { getPasswordByIdService } from "../../models/AuthModel.js";

/* 
Function to double check if the user REALLY meant to do some action. 
E.g. if the user wants to delete their account, they must first type in their password, 
then this function will verify that that password matches the hashed password stored in the database (plus some other sanity checks),
and then give the green light to go on to the next function.
*/
export const validatePassword = async (req, res, next) => {
	const { password } = req.body;

	try {
		const hashedPass = await getPasswordByIdService(req.params.id);

		if (!hashedPass) {
			return res
				.status(404)
				.json({ message: "Hashed password not found in database" });
		}

		const isPassValid = await bcrypt.compare(password, hashedPass.password);

		if (!isPassValid) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		next();
	} catch (e) {
		next(e);
	}
};

export default validatePassword;
