const express = require('express');
const app = express();
require('dotenv').config({path: "../.env"});
const clientRoute = require('./clientRoute');


const port = process.env.EXPRESS_CLIENT_PORT;

app.use(clientRoute);

app.listen(port, () => {
    console.log('Express client is running on port : ' + port)
})

