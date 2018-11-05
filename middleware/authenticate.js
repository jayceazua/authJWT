const { User } = require('../models/user');
// middle for authorization
const authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    User.findByToken(token)
    .then((user) => {
        if(!user) {
            console.log('Could not find user.')
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        console.log(`Found user: ${token}`)
        next();
    })
    .catch((err) => {
        console.log(`This shit is not fucking working at all: ${token}`)
        res.status(401).send();
    });
}

module.exports = { authenticate }
