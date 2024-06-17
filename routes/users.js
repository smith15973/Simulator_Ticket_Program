const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = new User({username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to the SWR Ticket System!');
        res.redirect('/tickets');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
    
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', (req,res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect('/tickets');
})

module.exports = router;