require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const checkAuth = require("./API/Utils/Middlewares/authenticationCheck");
const { handleError, handleNoRoute, handleCors, logStream } = require("./API/Utils/utils");
const app = express();

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
app.use("/api/v1/user/", checkAuth, userRoutes);
app.use("/api/v1/question/", checkAuth, questionRoutes);
app.use("/api/v1/answer/", checkAuth, answerRoutes);
//CORS settings access for everyone
app.use(handleCors);
app.use(handleNoRoute);
app.use(handleError);

module.exports = app;
