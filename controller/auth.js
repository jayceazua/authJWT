const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Mock User input
const mockUser = {
    username: 'jackFrost',
    email: 'jack.frost@email.com',
    password: 'superSecretPassword',
    firstName: 'Jack',
    lastName: 'Frost'
}



// SIGN UP FORM
router.get('/sign-up', (req, res) => {
    res.json({'sign-up'});
});
// SIGN UP POST
router.post('/sign-up', (req, res) => {
    // create a new instance of our model
    // Create User
    const user = new User(mockUser);
    user.save().then((user) => {
        let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.json('Success');
    }).catch((err) => {
        console.log(err.message);
        return res.status(400).send({ err: err });
    });
});


// LOGIN FORM
router.get('/login', (req, res) => {
    res.json({'login'})
})
// LOGIN POST
router.post('/login', (req, res) => {
    User.findById(req.params._id)
    .then((user) => {
        jwt.sign({ _id: user._id }, 'secret_key', (err, token) => {
            res.json({token})
        });
            // you want to use localStorage for saving tokens
    })
    .catch((err) => {
        console.log(err.message)
    });
});

// passing middleware you do not need to invoke
router.get('/bananas', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret_key')
    .then((authData) => {
        res.json({
            message: " love bananas!",
            authData
        });
    })
    .catch((err) => {
        res.sendStatus(403)
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
        // Forbidden
        res.sendStatus(403)
    }
}



module.exports = router;
