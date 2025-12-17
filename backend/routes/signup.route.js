const express = require('express');
const signup = express.Router();
const User = require('../models/user.model');

signup.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({name, email, password });
  res.status(201).json(user);
})

module.exports = signup;