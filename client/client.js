const grpc = require('@grpc/grpc-js');
const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');

function main() {
    let client = new service.GreetingServiceClient
        (
            'localhost:50051',
            grpc.credentials.createInsecure()
        );

    let req = new greets.GreetRequest();
    let greeting = new greets.Greeting();
    greeting.setFirstName("Rojo");
    greeting.setLastName("Verde");

    req.setGreeting(greeting);

    client.greet(req, (err, res) => {
        if (err) {
            console.error(err);
            throw err;
        };

        console.dir(res.getResult());
    });
}

main();