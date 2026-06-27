//file for input validation for register/login

import Joi from "joi";

const userSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string()
		.min(8)
		.max(128)
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$"))
		.required()
		.messages({
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
			"string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot be longer than 128 characters long.",
			"any.required": "Password is a required field.",
		}),
});

const validateRegistration = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error)
		return res.status(400).json({
			status: 400,
			message: error.details[0].message,
		});
	next();
};

export default validateRegistration;
