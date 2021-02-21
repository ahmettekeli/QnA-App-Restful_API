const user = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			//TODO hide this, store hashed password
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				isEmail: true,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			timestamps: true,
		}
	);
	User.sync();
	return User;
};

module.exports = user;
