const question = (sequelize, DataTypes) => {
	const Question = sequelize.define(
		"question",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			question: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			hasAnswers: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
	Question.sync();
	return Question;
};

module.exports = Question;
