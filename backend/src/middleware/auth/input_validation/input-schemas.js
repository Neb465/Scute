import Joi from "joi";

const email_field = Joi.string()
	.email()
	.lowercase()
	.required()
	.messages({
		"string.base": "Email should be a type of text.",
		"string.empty": "Email cannot be empty.",
		"string.min": "Email must be at least 3 characters long.",
		"string.max": "Email cannot be longer than 50 characters long.",
		"string.email": "Email must be a valid email address.",
		"any.lowercase": "Email must be lowercase.",
		"any.required": "Email is a required field."
	}
);
const name_field = Joi.string()
	.min(3)
	.max(50)
	.required()
	.messages({
		"string.base": "Name should be a type of text.",
		"string.empty": "Name cannot be empty.",
		"string.min": "Name must be at least 3 characters long.",
		"string.max": "Name cannot be longer than 50 characters long.",
		"any.required": "Name is a required field."
	}
);

const pass_field = Joi.string()
	.min(8)
	.max(128)
	.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$"))
	.required()
	.messages({
		"string.base": "Password should be a type of text.",
		"string.empty": "Password cannot be empty.",
		"string.pattern.base":
			"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
		"string.min": "Password must be at least 8 characters long.",
		"string.max": "Password cannot be longer than 128 characters long.",
		"any.required": "Password is a required field.",
	}
);

const search_field = Joi.array()
	.min(1)
	.required()
	.messages({
		"array.base": "Search query not processed properly.",
		"array.min": "Search query must not be blank.",
		"any.required": "Search query is a required field."
	}
);

export const loginSchema = Joi.object({
	email: email_field,
	password: Joi.string().required(),
});

export const registrationSchema = Joi.object({
	name: name_field,
	email: email_field,
	password: pass_field,
});

export const userAllInfoUpdateSchema = Joi.object({
	name: name_field,
	email: email_field,
	password: pass_field,
});

export const userPassUpdateSchema = Joi.object({
	password: pass_field,
});

export const forgotPassSchema = Joi.object({
	email: email_field
})

export const resetPassSchema = Joi.object({
	password: pass_field
})

export const searchSchema = Joi.object({
	start: search_field,
	goal: search_field
})
