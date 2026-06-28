import Joi from "joi";

const email_field = Joi.string().email().lowercase().required();
const name_field = Joi.string().min(3).max(50).required();
const update_pass_field = Joi.string()
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
	});

export const loginSchema = Joi.object({
	email: email_field,
	password: Joi.string().required(),
});

export const registrationSchema = Joi.object({
	name: name_field,
	email: email_field,
	password: update_pass_field,
});

export const userAllInfoUpdateSchema = Joi.object({
	name: name_field,
	email: email_field,
	password: update_pass_field,
});

export const userPassUpdateSchema = Joi.object({
	password: update_pass_field,
});

export const forgotPassSchema = Joi.object({
	email: email_field
})

export const resetPassSchema = Joi.object({
	password: update_pass_field
})
