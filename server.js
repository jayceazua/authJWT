const exp = require('express');
const app = exp();

// database connection

// routes

app.get('/', (req, res) => {
    res.send('Authenication Tutorial')
});

app.listen(3000, () => {
    console.log(`Server is on port: 3000`)
});
