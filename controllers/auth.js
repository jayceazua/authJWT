const router = require('express').Router();
const User = require('../models/user');

// SIGN UP FORM
router.get('/users', (req, res) => {
    res.send('sign up form')
});

// NEW USER
router.post('/users', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then((user) => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
    
});

module.exports = router
