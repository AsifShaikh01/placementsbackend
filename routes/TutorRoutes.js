const express = require('express');
const router = express.Router();
const { authTutor } = require('../middleware/authMiddleware');
const {AnswerModel} = require('../models/Answer.model');

const {QuestionModel} = require('../models/Question.model');

// GET all unanswered questions
router.get('/unanswered',authTutor, async (req, res) => {
  try {
    const unansweredQuestions = await QuestionModel.find({ answered: false  });
    res.json(unansweredQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/answer/:questionId',authTutor, async (req, res) => {
    const { tutorId, answer } = req.body;
    const questionId = req.params.questionId;
  
    try {
      const newAnswer = new AnswerModel({
        tutorId,
        questionId,
        answer,
        // Add other fields as needed
      });
  
      await newAnswer.save();
  
      // Update the question's answered status to true
      await QuestionModel.findByIdAndUpdate(questionId, { answered: true });
  
      res.status(201).json(newAnswer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;