const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentModel = require('../models/Student.model');

// Student registration
router.post('/register', async (req, res) => {
  const { name, age ,grade, classValue, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new StudentModel({
      name,
      age,
      grade,
      classValue,
      email,
      password: hashedPassword,
      
    });

    await newStudent.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Student login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the student exists
    const existingStudent = await StudentModel.findOne({ email });
    if (!existingStudent) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingStudent.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: existingStudent.email }, 'masai');
    
    res.status(200).json({ token }); // Send the token to the client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;