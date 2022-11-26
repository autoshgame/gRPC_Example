const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { mongoose } = require('mongoose');
const userService = require('./Service/user.service');
require('./Config/mongodbconfig');
require('dotenv').config({path: "../.env"});

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true,
};

const pkgDefs = protoLoader.loadSync("user.proto", options);

const userProto = grpc.loadPackageDefinition(pkgDefs);

const sever = new grpc.Server();

sever.addService(userProto.UserService.service, {
    GetUserById: async (input, callback) => {
        try {
            let userId = input.request._id;
            let user = await userService.findUser(userId);
            callback(null, user);
        } catch (error) {
            callback(error, null);
        }
    },
    GetAllUser: async (input, callback) => {
        try {
            let users = await userService.findAllUser();
            let grpcResult = {};
            grpcResult.users = users;
            callback(null, grpcResult);
        } catch (error) {
            
        }
    },
    AddNewUser: async (input, callback) => {
        try {
            let newUser = input.request;
            let grpcResult = {};
            let result = await userService.addUser(newUser);
            
            if (result.errors) {
                grpcResult.isSuccess = false;
            } else {
                grpcResult.isSuccess = true;
            }

            callback(null, grpcResult);
        } catch (error) {
            callback(error, null);
        }
    },
    DeleteUserById: async (input, callback) => {
        try {
            let userId = input.request._id;
            let grpcResult = {}; 
            let result = await userService.deleteUser(userId);
            
            if (result.errors) {
                grpcResult.isSuccess = false;
            } else {
                grpcResult.isSuccess = true;
            }

            callback(null, grpcResult);
        } catch (error) {
            callback(error, null);
        }
    },
    ReplaceUserById: async (input, callback) => {
        try {
            let userId = input.request._id;
            let newUser = {
                "name" : input.request.name,
                "address" : input.request.address
            };
            
            let grpcResult = {};

            let result = await userService.replaceUser(userId, newUser);

            if (result.errors) {
                grpcResult.isSuccess = false;
            } else {
                grpcResult.isSuccess = true;
            }

            callback(null, grpcResult)
        } catch (error) {
            callback(error, null);
        }
    }
});


sever.bindAsync(
    process.env.GRPC_SEVER_PORT,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log(`listening on port ${port}`);
      sever.start();
    }
);
