const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/sign-up', (req, res) => {

});

router.post('/sign-up', (req, res) => {
    let user = new User(req.body);
    user.save()
    .then((_user) => {
        console.log('Saved.');
        let token = jwt.sign({ _id: _user._id }, 'shhhhhhared-secret');
    })
    .catch((err) => {
        console.log(err.message)
    })
});

module.exports = router;
