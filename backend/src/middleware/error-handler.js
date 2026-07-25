//General error handler as a last resort if other middleware doesn't find any specific errors
const errorHandler = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: err.message });
	}
};

export default errorHandler;
