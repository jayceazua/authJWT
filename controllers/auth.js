const router = require('express').Router();
const _ = require('lodash');
const User = require('../models/user');

// NEW USER
router.get('/users', (req, res) => {
    res.send('sign up form')
});

// CREATE USER
router.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user =  new User(body);
    user.save()
    .then((_user) => {
        res.send(_user)
    })
    .catch((e) => {
        res.status(400).send(e)
    });
});

module.exports = router
