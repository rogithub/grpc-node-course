const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const address = "localhost:50051";
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

function main() {    
    let client = new greet_proto.GreetSvc
        (
            address,
            grpc.credentials.createInsecure()
        );

    let req = {
        greeting: {
            firstName: "Rodrigo",
            lastName: "Jeremías",
        }
    };    
    
    client.greet(req, (err, res) => {        
        if (err) throw err;

        console.dir(res);
    });
}

main();