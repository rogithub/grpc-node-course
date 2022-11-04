let grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const address = "127.0.0.0:4500";
const PROTO_PATH = __dirname +'/../protos/greet.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
   
});

const greet_proto = grpc.loadPackageDefinition(packageDefinition).greet;

/*
  Implements the greet RPC method.
*/

function greet(call, callback) {
    let greeting = new greet_proto.GreetResponse();
    greeting.setResult(`
        Hello ${call.request.getGreeting().getFirstName()}
    `);

    callback(null, greeting);
}


function main() {
    const server = new grpc.Server();


    server.addService(greet_proto.GreetSvc.service, {
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
