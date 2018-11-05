const router = require('express').Router();
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');

// NEW USER
router.get('/users', (req, res) => {
    res.json('Signup form');
});

// CREATE USER
router.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    });
});

// LOGIN
router.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send()
    });
});
// LOGOUT
router.delete('/users/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(400).send()
    })
})


module.exports = router
