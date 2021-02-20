const handleError = (error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
			error: {
				message: error.message,
			},
		});
	},
	handleNoRoute = (req, res, next) => {
		const error = new Error("Route not found.");
		error.status = 404;
		next(error);
	},
	handleCors = (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access, Authorization");

		//Browser always send an options request first. If that's the case let's allow browser to send following requests.
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json();
		}
		next();
	};

module.exports = { handleError, handleNoRoute, handleCors };
