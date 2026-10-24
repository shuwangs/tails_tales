const errorHandler = (err, _req, res, _next) => {
	console.error(err);

	const status =
		Number.isInteger(err.status) &&
			err.status >= 400 &&
			err.status <= 599
			? err.status
			: 500;
	res.status(status).json({
		success: false,
		message: status === 500 ? "Internal Server Error" : err.message,
	});
};

export default errorHandler;
