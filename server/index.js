let grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const address = "127.0.0.1:50051";
const PROTO_PATH = 
    path.join(__dirname, '..', 'protos', 'greet.proto');

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
    let result = `Hello ${call.request.greeting.firstName}`;
    callback(null, { result: result });
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
