module.exports = {
	development: {
		database: {
			QnA_DB: {
				database: process.env.DB,
				username: process.env.DB_USER_NAME,
				password: process.env.DB_PASSWORD,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialect: process.env.DB_DIALECT,
			},
		},
	},
	production: {
		database: {
			QnA_DB: {
				database: process.env.DB,
				username: process.env.DB_USER_NAME,
				password: process.env.DB_PASSWORD,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialect: process.env.DB_DIALECT,
			},
		},
	},
};
