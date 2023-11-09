//const express =require('express')
const https = require('https');
const fs = require('fs');


const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, (req, res) => {
    // Your request handling code goes here
  
    // For demonstration purposes, this example sends a simple response for all requests
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('{"content":"hello world"}');
    //res.sendFile('./index.html')
  });


const httpsPort = 3000; // The standard port for HTTPS

module.exports ={
  httpsServer,
  httpsPort
}
/*httpsServer.listen(httpsPort, () => {
console.log(`HTTPS Server running on https://localhost:${httpsPort}/`);
});*/