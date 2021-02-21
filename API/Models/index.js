require("dotenv").config();
const fs = require("fs"),
	path = require("path"),
	Sequelize = require("sequelize"),
	basename = path.basename(__filename),
	env = process.env.NODE_ENV || "development",
	config = require("../Config/config")[env];

let db = {},
	database,
	dbPath;

const databases = Object.keys(config.databases);

for (let index = 0; index < databases.length; index++) {
	database = databases[index];
	dbPath = config.databases[database].QnA_DB;
	db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}

//Adding db models
fs.readdirSync(__dirname + "/QnA_DB")
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file) => {
		let model = require(`./QnA_DB/${file}`)(db[database], Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = db;
