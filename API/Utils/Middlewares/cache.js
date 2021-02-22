const redisClient = require("../redisConnection");

const cacheUser = (req, res, next) => {
		if (redisClient.hgetall("user")) {
			//handle returning cached user
		}
		//handle retrieving user from the db
		//cache user
	},
	cacheQuestion = (req, res, next) => {
		if (redisClient.hgetall("question")) {
			//handle returning cached user
		}
		//handle retrieving question from the db
		//cache answer
	},
	cacheAnswer = (req, res, next) => {
		if (redisClient.hgetall("answer")) {
			//handle returning cached user
		}
		//handle retrieving answer from the db
		//cache answer
	};

module.exports = { cacheUser, cacheQuestion, cacheAnswer };
