var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('https/key.pem'),
  cert: fs.readFileSync('https/cert.pem')
};

// Create a service (the app object is just a callback).
var app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use('/src', express.static('src'));
app.use('/node_modules', express.static('node_modules'));
app.use('/lib', express.static('lib'));
app.use('/data', express.static('data'));

// Create an HTTP service.
http.createServer(app).listen(8888);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
