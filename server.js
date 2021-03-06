const express = require('express');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 8080;
const app = express();

// database connection
require('./database/MongoDB');
// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// override with POST having ?_method=DELETE & ?_method=PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.get('/', (req, res) => {
    res.status(200).send({
        error: "Page not found.",
        name: "Authentication and Authorization Tutorial."
    })
});

app.get('/bananas', authenticate, (req, res) => {
    res.send(req.user);
});

// user auth routes
const auth = require('./controllers/auth')
app.use(auth);


app.listen(port, () => {
    console.log(`Server is on port: ${port}`)
});

module.exports = { app };
