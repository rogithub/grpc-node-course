const grpc = require('@grpc/grpc-js');

function main () {
    const server = new grpc.Server();

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
