//General error handler as a last resort if other middleware doesn't find any specific errors
const errorHandler = (err, req, res, next) => {
	//Specific error for duplicate emails during registration
	if (err.code === '23505') {
		res.status(400).json({
			message: "Email already registered."
		})
	} else if (err.status) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: err.message });
	}
};

export default errorHandler;
