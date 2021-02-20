require("dotenv").config();

const checkAuth = (req, res, next) => {
	if (!req.query.apiKey) {
		return res.status(401).json({
			message: "Must be authenticated with an API Key.",
		});
	}
	const apiKey = req.query.apiKey;
	//TODO make api key check/creation dynamic.
	if (apiKey === process.env.API_KEY) {
		return next();
	}
	res.status(401).json({
		message: "Invalid API Key",
	});
};

module.exports = checkAuth;
