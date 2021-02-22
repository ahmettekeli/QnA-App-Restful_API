require("dotenv").config();
const express = require("express"),
	bodyParser = require("body-parser"),
	helmet = require("helmet"),
	morgan = require("morgan"),
	checkAuth = require("./API/Utils/Middlewares/authenticationCheck"),
	{ handleError, handleNoRoute, handleCors, logStream } = require("./API/Utils/utils"),
	app = express();

const questionRoutes = require("./API/Routes/question"),
	answerRoutes = require("./API/Routes/answer"),
	userRoutes = require("./API/Routes/user");

app.use(helmet());
app.use(morgan("combined", { stream: logStream() }));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());
//TODO implement caching middleware. (wrap middlewares)
app.use("/api/v1/user/", checkAuth, userRoutes);
app.use("/api/v1/question/", checkAuth, questionRoutes);
app.use("/api/v1/answer/", checkAuth, answerRoutes);
//CORS settings access for everyone
app.use(handleCors);
app.use(handleNoRoute);
app.use(handleError);

module.exports = app;
