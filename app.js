require("dotenv").config();
const express = require("express"),
	bodyParser = require("body-parser"),
	helmet = require("helmet"),
	morgan = require("morgan"),
	checkAuth = require("../Utils/authenticationCheck"),
	{ handleError, handleNoRoute, handleCors } = require("./API/Utils/utils"),
	app = express();

const questionRoutes = require("./API/Routes/question"),
	answerRoutes = require("./API/Routes/answer"),
	userRoutes = require("./API/Routes/user");

//DB connection goes here.

app.use(helmet());
app.use(morgan("combined"));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyparser.json());
app.use("/api/v1/user/", checkAuth, userRoutes);
app.use("/api/v1/question/", checkAuth, questionRoutes);
app.use("/api/v1/answer/", checkAuth, answerRoutes);
//CORS settings access for everyone
app.use(handleCors);
app.use(handleNoRoute);
app.use(handleError);

module.exports = app;
