const { use } = require('../../Express/clientRoute');
const { User } = require('../Model/user.model');

async function addUser(newUser) {
    let user = new User(newUser);
    let result = await user.save();
    return result;
}

async function replaceUser(userId, newUser) {
    let result = await User.findByIdAndUpdate(userId, newUser).orFail();
    return result;
}

async function findUser(userID) {
    let result = await User.findById(userID).lean();
    return result;
}

async function findAllUser() {
    let users = await User.find().lean();
    return users;
}

async function deleteUser(userID) {
    let result = await User.findByIdAndRemove(userID).orFail();
    return result;
}

module.exports = {
    addUser,
    findUser,
    findAllUser,
    deleteUser,
    replaceUser,
}
