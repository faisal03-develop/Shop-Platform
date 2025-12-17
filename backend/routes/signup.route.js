const express = require('express');
const signup = express.Router();
const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');
const createToken = require('../controllers/createToken');

signup.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try{
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({name, email, password });
    const token = createtoken(user._id);
    res.status(201).json(token, user);
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = signup;