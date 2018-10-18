const router = require('express').Router();
const User = require('../models/user');

// NEW USER
router.get('/users', (req, res) => {
    res.json('Signup form')
});

// CREATE USER
router.post('/users', (req, res) => {
    // let body = _.pick(req.body, ['email', 'password']);
    let user = new User(req.body);
    user.save()
        .then(() => {
            return user.generateAuthToken()
        })
        .then((token) => {
            res.header('x-auth', token).send(user)
        })
        .catch((e) => {
            res.status(400).send(e)
        });
});

// LOGIN FORM
router.get('/login', (req, res) => {
    res.json('Login form')
});
// LOGIN USER
router.post('/login', (req, res) => {
    res.json('Successfully logged in.')
});


module.exports = router
