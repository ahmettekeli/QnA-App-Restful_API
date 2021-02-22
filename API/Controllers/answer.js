const { client, cacheQuestions, cacheAnswers, getCachedValues } = require("../Utils/Middlewares/cache"),
	db = require("../Models"),
	Answer = db.answer;

//TODO listen for redis connect event for when caching.

const getAnswers = async (req, res) => {
		try {
			const answers = await Answer.findAll();
			if (!answers) {
				return res.status(404).json({
					message: "No answers found.",
				});
			}
			return res.status(200).json({
				answers,
				message: "Answers are retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getAnswersByQuestion = async (req, res) => {
		const id = req.params.id;
		try {
			const answers = await Answer.findAll({
				where: {
					questionId: id,
				},
			});
			if (!answers) {
				return res.status(404).json({
					message: "No answers found.",
				});
			}
			return res.status(200).json({
				answers,
				message: "Answers have been retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	getAnswer = async (req, res) => {
		const id = req.params.id;
		try {
			const answer = await Answer.findOne({
				where: {
					id,
				},
			});
			if (!answer) {
				return res.status(404).json({
					message: "Answer could not be found.",
				});
			}
			return res.status(200).json({
				answer,
				message: "Answer has been retrieved successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	createAnswer = async (req, res) => {
		try {
			const answer = await Answer.create({
				answer: req.body.answer,
				questionId: req.body.questionId,
			});
			if (!answer) {
				return res.status(500).json({
					message: "Answer could not be created.",
				});
			}
			return res.status(200).json({
				answer,
				message: "Answer has been created successfully.",
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	updateAnswer = async (req, res) => {
		const id = req.params.id,
			updateOptions = {};
		for (const option in req.body) {
			updateOptions[option] = req.body[option];
		}
		try {
			const answer = await Answer.update(updateOptions, {
				where: {
					id,
				},
			});
			if (!answer) {
				return res.status(500).json({
					message: "Answer could not be updated.",
				});
			}
			return res.status(200).json({
				message: "Answer has been updated successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deleteAnswer = async (req, res) => {
		const id = req.params.id;
		try {
			const deleteResult = await Answer.destroy({
				where: {
					id,
				},
			});
			if (!deleteResult) {
				return res.status(500).json({
					message: "Answer could not be deleted.",
				});
			}
			return res.status(200).json({
				message: "Answer has been deleted successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};
module.exports = { getAnswers, getAnswersByQuestion, getAnswer, createAnswer, updateAnswer, deleteAnswer };
