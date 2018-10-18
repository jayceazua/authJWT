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

router.get('/users/me', (req, res) => {
    let token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user) {

        }
        res.send(user);
    });
});



module.exports = router
