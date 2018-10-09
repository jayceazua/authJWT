const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const auth = require('./controller/auth');
app.use('/user', auth);

app.listen(port, () => {
    console.log('Kitchen is ready!');
});
