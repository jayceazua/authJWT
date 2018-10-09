const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/sign-up', (req, res) => {
    res.json({
        message: 'Sign up'
    })
});

router.post('/login', (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'jayceazua',
        email: 'jayce.azua@gmail.com'
    }
    jwt.sign({user}, 'secret_key',
    // options (e.g. expiration)
    {expiresIn: '30s'},
    (err, token) => {
        res.json({token})
    });
    // you want to use localStorage for saving tokens
});

router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        // check for error
        if (err) {
            res.sendStatus(403)
        }
        else {
            res.json({
                message: "You are in!",
                authData
            });
        }
    });
});

// Verify Token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken
        // next middleware
        next();
    }
    else {
        // forbidden
        res.sendStatus(403)
    }
}

module.exports = router;
