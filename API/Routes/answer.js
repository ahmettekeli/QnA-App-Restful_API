const express = require("express");
const router = express.Router();

const answerController = require("../Controllers/answer");

router.get("/", answerController.getAnswers);
router.get("/byQuestion/:id", answerController.getAnswersByQuestion);
router.get("/:id", answerController.getAnswer);
router.post("/", answerController.createAnswer);
router.patch("/:id", answerController.updateAnswer);
router.delete("/:id", answerController.deleteAnswer);

module.exports = router;
