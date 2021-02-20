const db = require("../Models"),
	Answer = db.QnA_DB.models.answer;

const getAnswers = (res, req) => {
		console.log("Restieving all answers...");
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
	},
	getAnswersByQuestion = (res, req) => {
		console.log("Retrieving all answers attached to the question...");
		const id = req.params.id,
			answers = await Answer.findAll({
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
			message: "Answers are retrieved successfully.",
		});
	},
	getAnswer = (res, req) => {
		console.log("Retieving answer...");
        const id= req.params.id,
        answer = await Answer.find({
            where:{
                id,
            }
        })
        if(!answer){
            return res.status(404).json({
                message:"Answer could not be found."
            })
        }
        return res.status(200).json({
            answer,
            message:"Answer is retrieved successfully."
        })
	},
	createAnswer = (res, req) => {
		console.log("Creating answer...");
        const answer = await Answer.create({
            answer:req.body.answer,
            questionId: req.body.questionId,
        })
        if(!answer){
            return res.status(500).json({
                message:"Answer could not be created."
            })
        }
        return res.status(200).json({
            answer,
            message:"Answer is created successfully."
        })
	},
	updateAnswer = (res, req) => {
		console.log("Updating answer...");
        const id = req.params.id,
        updateOptions = {};
        for(const option in req.body){
            updateOptions[option.propName] = option.value;
        }
        const answer = await Answer.update(updateOptions,{
            where:{
                id
            }
        })
        if(!answer){
            return res.status(500).json({
                message:"Answer could not be updated."
            })
        }
        return res.status(200).json({
            answer,
            message:"Answer is updated successfully."
        })
	},
	deleteAnswer = (res, req) => {
		console.log("Deleting answer...");
        const id = req.params.id,
        deleteResult = await Answer.destroy({
            where:{
                id
            }
        })
        if(!deleteResult){
            return res.status(500).json({
                message: "Answer could not be deleted."
            })
        }
        return res.status(200).json({
            message: "Answer is deleted successfully."
        })
	};
module.exports = { getAnswers, getAnswersByQuestion, getAnswer, createAnswer, updateAnswer, deleteAnswer };
