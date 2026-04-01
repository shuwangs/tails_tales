const errorHandler = (err, req, res, next) => {
	console.error(err);

	if (err.message) {
		return res.status(err.status).json({
			success: false,
			message: err.message,
		});
	}
	res.status(500).json({
		success: false,
		message: "Internal Server Error",
	});
};

export default errorHandler;
