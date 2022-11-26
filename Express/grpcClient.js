const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
require('dotenv').config({path: "../.env"});

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true,
}

const pkgDefs = protoLoader.loadSync("user.proto", options);

const UserService = grpc.loadPackageDefinition(pkgDefs).UserService;

const client = new UserService (
    process.env.GRPC_SEVER_PORT,
    grpc.credentials.createInsecure()
);

module.exports = {
    client
}



