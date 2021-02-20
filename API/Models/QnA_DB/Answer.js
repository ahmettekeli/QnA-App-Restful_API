const answer = (sequelize, DataTypes) => {
	const Answer = sequelize.define(
		"answer",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			answer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			questionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
	Answer.sync();
	return Answer;
};

module.exports = answer;
