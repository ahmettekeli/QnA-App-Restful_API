require("dotenv").config();
const express = require("express"),
	bodyParser = require("body-parser"),
	{ handleError, handleNoRoute, handleCors } = require("./API/Utils/utils"),
	app = express();

const questionRoutes = require("./API/Routes/questions"),
	answerRoutes = require("./API/Routes/answers"),
	userRoutes = require("./API/Routes/users");

//DB connection goes here.

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyparser.json());
//CORS settings access for everyone
app.use(handleCors);
app.use(handleNoRoute);
app.use(handleError);

module.exports = app;
