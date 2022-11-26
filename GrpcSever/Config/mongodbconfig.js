const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

try {
    mongoose.connect(process.env.MONGO_URL);
} catch (error) {
    console.log(error);
}