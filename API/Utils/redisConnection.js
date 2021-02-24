require("dotenv").config();
const redis = require("redis");
const client = redis.createClient({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
});

// client.auth(process.env.REDIS_PASSWORD);

client.on("error", (error) => {
	handleError(error);
});

client.on("connect", () => {
	handleConnectionSuccess();
});

const handleError = (error) => {
		console.error(error);
	},
	handleConnectionSuccess = () => {
		console.log("Redis connection is successful");
	};

module.exports = client;
