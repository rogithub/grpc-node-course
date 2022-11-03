const grpc = require('@grpc/grpc-js');
const greets  = require('./protos/greet_pb');
const service = require('./protos/greet_grpc_pb');

/*
  Implements the greet RPC method.
*/

function greet(call, callback) {
    let greeting = new greets.GreetResponse();
    greeting.setResult(`
        Hello ${call.request.getGreeting().getFirstname()}
    `);

    callback(null, greeting);
}

function main () {
    const server = new grpc.Server();
    server.addService(service.GreetServiceService, {
	greet: greet
    });

    const address = "127.0.0.0:50051";

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
