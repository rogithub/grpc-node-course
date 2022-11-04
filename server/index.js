let grpc = require('@grpc/grpc-js');
let greets = require('./protos/greet_pb');
let service = require('./protos/greet_grpc_pb');
const address = "127.0.0.0:50051";


/*
  Implements the greet RPC method.
*/

function greet(call, callback) {
    let greeting = new greets.GreetResponse();
    greeting.setResult(`
        Hello ${call.request.getGreeting().getFirstName()}
    `);

    callback(null, greeting);
}


function main() {
    const server = new grpc.Server();


    server.addService(service.GreetingServiceService, {
        greet: greet
    });    

    server.bindAsync(
        address,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) throw err;

            server.start();
            console.log("gRPC Server listening on: ");
            console.log(`${address}`);
        });
}

main();
