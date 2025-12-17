const express = require('express');
const login = express();
const User = require('../models/user.model');
const mongoose = require('mongoose');

const createToken = require('../controllers/createToken');



login.post('/login', async (req, res) => {
    try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await user.matchPassword(password);
    if(!user) return res.status(400).json({ message: 'Invalid Mail Address || User Not registered' });
    if(!isMatch) return res.status(400).json({ message: 'Invalid Password' });
    const token = createToken(user._id);
    res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
    });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = login;