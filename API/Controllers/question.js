const db = require("../Models"),
	Question = db.QnA_DB.models.question;

const getQuestions = async (req, res) => {
		console.log("Retieving all questions...");
		try {
			const questions = await Question.findAll();
			if (!questions) {
				return res.status(404).json({
					message: "No question found.",
				});
			}
			return res.status(200).json({
				questions,
				message: "Questions have been retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getQuestionsByUser = async (req, res) => {
		console.log("Retieving all questions...");
		const id = req.params.id;
		try {
			const questions = await Question.findAll({
				where: {
					userId: id,
				},
			});
			if (!questions) {
				return res.status(404).json({
					message: "No question found.",
				});
			}
			return res.status(200).json({
				questions,
				message: "Questions have been retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getQuestion = async (req, res) => {
		console.log("Retrieving question...");
		const id = req.params.id;
		try {
			const question = await Question.findOne({
				where: { id: id },
			});
			if (!question) {
				return res.status(404).json({
					message: "Question could not be found.",
				});
			}
			return res.status(200).json({
				question,
				message: "Question has been retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	createQuestion = async (req, res) => {
		console.log("Creating question...");
		try {
			const question = await Question.create({
				question: req.body.question,
				userId: req.body.userId,
			});
			if (!question) {
				return res.status(500).json({
					message: "Question could not be created.",
				});
			}
			return res.status(200).json({
				question,
				message: "Question has been created successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	updateQuestion = async (req, res) => {
		console.log("Updating question...");
		const id = req.params.id,
			updateOptions = {};
		for (const option of req.body) {
			updateOptions[option.propName] = option.value;
		}
		try {
			const question = await Question.update(updateOptions, {
				where: {
					id,
				},
			});
			if (!question) {
				return res.status(500).json({
					message: "Question could not be updated",
				});
			}
			return res.status(200).json({
				question,
				message: "Question has been updated successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deleteQuestion = async (req, res) => {
		console.log("Deleting question...");
		const id = req.params.id;
		try {
			const deleteResult = await Question.destroy({
				where: {
					id,
				},
			});
			if (!deleteResult) {
				return res.status(500).json({
					message: "Question could not be deleted.",
				});
			}
			return res.status(200).json({
				message: "Question has been deleted successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

module.exports = { getQuestions, getQuestionsByUser, getQuestion, createQuestion, updateQuestion, deleteQuestion };
