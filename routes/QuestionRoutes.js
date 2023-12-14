const express = require('express');
const router = express.Router();
const { authStudent } = require('../middlewares/authMiddleware');
const {QuestionModel} = require('../models/Question.model');


router.post('/', authStudent, async (req, res) => {
    const { studentId, question , date , subject } = req.body;
  
    try {
      const newQuestion = new QuestionModel({
        studentId,
        question,
        date,
        subject
      });
  
      const savedQuestion = await newQuestion.save();
      res.status(201).json(savedQuestion);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/:studentId',authStudent, async (req, res) => {
    try {
      const studentId = req.params.studentId;
  
      const questionsWithAnswers = await Question.find({ studentId }).populate('answers');
      res.json(questionsWithAnswers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/recent/:studentId', authStudent, async (req, res) => {
    try {
      const studentId = req.params.studentId;
  
      const lastRecentQuestion = await Question.findOne({ studentId })
        .sort({ date: -1 }) // Sort by date in descending order to get the most recent question
        .populate('answers');
  
      res.json(lastRecentQuestion);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;