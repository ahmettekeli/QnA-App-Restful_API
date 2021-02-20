const db = require("../Models"),
	Answer = db.QnA_DB.models.answer;

const getAnswers = async (res, req) => {
		console.log("Restieving all answers...");
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
	getAnswersByQuestion = async (res, req) => {
		console.log("Retrieving all answers attached to the question...");
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
	getAnswer = async (res, req) => {
		console.log("Retieving answer...");
		const id = req.params.id;
		try {
			const answer = await Answer.find({
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
	createAnswer = async (res, req) => {
		console.log("Creating answer...");
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
			res.status(500).json({ error: error.message });
		}
	},
	updateAnswer = async (res, req) => {
		console.log("Updating answer...");
		const id = req.params.id,
			updateOptions = {};
		for (const option in req.body) {
			updateOptions[option.propName] = option.value;
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
				answer,
				message: "Answer has been updated successfully.",
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	deleteAnswer = async (res, req) => {
		console.log("Deleting answer...");
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
