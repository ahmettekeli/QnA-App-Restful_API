const express = require("express"),
	router = express.Router();

const answerController = require("../Controllers/answer");

router.get("/", answerController.getAnswers);
router.get("/byQuestion", answerController.getAnswersByQuestion);
router.get("/:id", answerController.getAnswer);
router.post("/:id", answerController.createAnswer);
router.patch("/:id", answerController.updateAnswer);
router.delete("/:id", answerController.deleteAnswer);

module.exports = router;
