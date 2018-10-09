
const express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000,
    auth = require('./controller/auth'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', auth);

app.listen(port, () => {
    console.log('Kitchen is ready!');
});
