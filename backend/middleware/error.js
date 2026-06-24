//General error handler as a last resort if other middleware doesn't find any specific errors
const errorHandler = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).json({ msg: err.message });
	} else {
		res.status(500).json({ msg: err.message });
	}
};

export default errorHandler;
