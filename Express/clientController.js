const grpcClient = require('./grpcClient');

async function getAllUser(req, res, next) {
    try {
        await grpcClient.client.GetAllUser({}, (error, result) => {
            if (error) {
                next(err);
            } else {
                res.status(200).send(result.users);
            }
        });
    } catch (err) {
        next(err);
    }
}


async function getUserById(req, res, next) {
    try {
        let userId = req.params['id'];

        await grpcClient.client.GetUserById({_id : userId}, 
            (error, result) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).send(result);
                }
            });
    } catch (error) {
        next(error);
    }
}


async function addNewUser(req, res, next) {
    try {
        let body = req.body;
        await grpcClient.client.AddNewUser(body, 
            (error, result) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).send(result);
                }
            });
    } catch (error) {
        next(error);
    }
}


async function deleteUserById(req, res, next) {
    try {
        let userId = req.params['id'];

        await grpcClient.client.DeleteUserById({_id : userId},
            (error, result) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).send(result);
                }
            })
    } catch (error) {
        next(error);
    }
}


async function replaceUserById(req, res, next) {
    try {
        let body = req.body;
        let userId = req.params['id'];

        body._id = userId;

        await grpcClient.client.ReplaceUserById(body, 
            (error, result) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).send(result);
                }
            });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    addNewUser,
    deleteUserById,
    replaceUserById,
}