const db = require("../Models"),
	Question = db.QnA_DB.models.question;

const getQuestions = (req, res) => {
		console.log("Retieving all questions...");
        const questions = await Question.findAll();
        if(!questions){
            return res.status(404).json({
                message: "No question found."
            })
        }
        return res.status(200).json({
            questions,
            message:"Questions are retrieved successfully."
        })
	},
    getQuestionsByUser = (req, res) => {
		console.log("Retieving all questions...");
        const id = req.params.id,
        questions = await Question.findAll({
            where:{
                userId:id
            }
        });
        if(!questions){
            return res.status(404).json({
                message: "No question found."
            })
        }
        return res.status(200).json({
            questions,
            message:"Questions are retrieved successfully."
        })
	},
	getQuestion = (req, res) => {
		console.log("Retrieving question...");
        const id = req.params.id,
         question = await Question.findOne({
            where: {id: id}
        });
        if(!question){
            return res.status(404).json({
                message:"Question is not found."
            })
        }
        return res.status(200).json({
            question,
            message:"Question is retrieved successfully."
        })
	},
	createQuestion = (req, res) => {
		console.log("Creating question...");
        const question = await Question.create({
            question:req.body.question,
            userId:req.body.userId,
        });
        if(!question){
            return res.status(500).json({
                message:"Question could not be created."
            })
        }
        return res.status(200).json({
            question,
            message:"Question is created successfully."
        })
	},
	updateQuestion = (req, res) => {
		console.log("Updating question...");
        const id = req.params.id,
        updateOptions = {};
    for (const option of req.body) {
        updateOptions[option.propName] = option.value;
    }
        const question = await Question.update(updateOptions, {
            where:{
                id
            }
        })
        if(!question){
            return res.status(500).json({
                message:"Question could not be updated"
            })
        }
        return res.status(200).json({
            question,
            message:"Question is updated successfully."
        })
	},
	deleteQuestion = (req, res) => {
		console.log("Deleting question...");
        const id = req.params.id,
        deleteResult = await Question.destroy({
            where:{
                id
            }
        });
        if(!deleteResult){
            return res.status(500).json({
                message:"Question could not be deleted."
            })
        }
        return res.status(200).json({
            message:"Question is deleted successfully."
        })
	};

module.exports = { getQuestions, getQuestionsByUser, getQuestion, createQuestion, updateQuestion, deleteQuestion };
