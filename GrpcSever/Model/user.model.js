const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
    
const User = mongoose.model("users", userSchema);

module.exports = {
    User
}