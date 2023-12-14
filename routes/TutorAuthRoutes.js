const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TutorModel = require('../models/Tutor.model');

// Tutor registration
router.post('/register', async (req, res) => {
  const { name, age, education,gender, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingTutor = await TutorModel.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new tutor
    const newTutor = new Tutor({
      name,
      age,
      gender,
      education,
      email,
      password: hashedPassword,
      // Other fields as needed
    });

    await newTutor.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tutor login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the tutor exists
    const existingTutor = await TutorModel.findOne({ email });
    if (!existingTutor) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingTutor.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: existingTutor.email }, 'masai');
    
    res.status(200).json({ token }); // Send the token to the client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;