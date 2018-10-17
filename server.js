const express = require('express');
const User =  require('./models/user');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const app = express();

// database connection
require('./database/MongoDB');
// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

const auth = require('./controllers/auth')
app.use(auth);


app.listen(3000, () => {
    console.log(`Server is on port: 3000`)
});
