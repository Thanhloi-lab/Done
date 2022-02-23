// var PROTO_PATH = __dirname + '../protos/service.proto';

// var async = require('async');
// var fs = require('fs');
// var parseArgs = require('minimist');
// var path = require('path');
// var _ = require('lodash');
// var grpc = require('@grpc/grpc-js');
// var protoLoader = require('@grpc/proto-loader');
// var packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {keepCase: true,
//      longs: String,
//      enums: String,
//      defaults: true,
//      oneofs: true
//     });
// var service = grpc.loadPackageDefinition(packageDefinition).model;
// var client = new service.TaskSvc('localhost:50051', grpc.credentials.createInsecure());

// var COORD_FACTOR = 1e7;

// function runGetAllMembersInTask(callback) {
    
//     var request = {
//       IdTask: 1
//     };
//     const result = client.GetAllMembersInTask(request);
//     console.log(result);
//   }

//   export {runGetAllMembersInTask};