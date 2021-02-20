const express = require("express");
const router = express.Router();

const questionController = require("../Controllers/question");

router.get("/", questionController.getQuestions);
router.get("/:id", questionController.getQuestion);
router.get("/byUser/:id", questionController.getQuestion);
router.post("/:id", questionController.createQuestion);
router.patch("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);
