const { promisify } = require("util");
const redisClient = require("../redisConnection");
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const hgetallAsync = promisify(redisClient.hgetall).bind(redisClient);
const hsetAsync = promisify(redisClient.hset).bind(redisClient);

const getCachedValues = async (keyName) => {
		let answers = [],
			keys = [];
		try {
			keys = await keysAsync(`${keyName}*`);
			if (keys.length > 0) {
				for (let index = 0; index < keys.length; index++) {
					let answer = await hgetallAsync(keys[index]);
					answers.push(answer);
				}
				return answers;
			} else {
				//handle no cached answer.
				return null;
			}
		} catch (error) {
			console.error({ error });
			return null;
		}
	},
	cacheQuestions = async (questions) => {
		for (let index = 0; index < questions.length; index++) {
			//TODO try not to hardcode object properties here.
			await hsetAsync(
				`question${index}`,
				"question",
				questions[index].question,
				"userId",
				questions[index].userId,
				"hasAnswers",
				questions[index].hasAnswers,
				"isActive",
				questions[index].isActive
			);
		}
	},
	cacheAnswers = async (answers) => {
		for (let index = 0; index < answers.length; index++) {
			//TODO try not to hardcode object properties here.
			await hsetAsync(
				`answer${index}`,
				"answer",
				answers[index].answer,
				"questionId",
				answers[index].questionId,
				"isActive",
				answers[index].isActive
			);
		}
	};

module.exports = { client: redisClient, cacheQuestions, cacheAnswers, getCachedValues };
