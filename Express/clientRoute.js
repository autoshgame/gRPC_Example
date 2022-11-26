const express = require('express');
const clientRoute = express.Router();
const clientController = require('./clientController');
const clientGlobalExHandler = require('./errorHanlderMiddleware');

const BASE_URL = "/users/";

clientRoute.use(express.json());

clientRoute.get(BASE_URL, clientController.getAllUser);
clientRoute.get(BASE_URL + ":id", clientController.getUserById);
clientRoute.put(BASE_URL + ":id", clientController.replaceUserById);
clientRoute.post(BASE_URL, clientController.addNewUser);
clientRoute.delete(BASE_URL + ":id", clientController.deleteUserById);

clientRoute.use(clientGlobalExHandler.globalExceptionHandler);

module.exports = clientRoute;