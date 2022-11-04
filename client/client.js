const grpc = require('@grpc/grpc-js');
const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');
const address = "localhost:50051";

function main() {
    let client = new service.GreetingServiceClient
        (
            address,
            grpc.credentials.createInsecure()
        );

    let req = new greets.GreetRequest();
    let greeting = new greets.Greeting();
    greeting.setFirstName("Rojo");
    greeting.setLastName("Verde");

    req.setGreeting(greeting);

    client.greet(req, (err, res) => {
        if (err) throw err;

        console.dir(res.getResult());
    });
}

main();