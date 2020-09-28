/*
node default modules:
http -> Launch a server, send requests
https -> Launch a SSL server
fs
path
os
*/

const http = require('http');
const fs = require('fs');

// arg of createServer is a function called requestListener
// this function will execute for every incomming request
// function return a server
const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);

    // use to unregister or quit the server
    // process.exit();

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        
        res.write('<html>');
        res.write('<head><title>Enter messege</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button type="submit">Click</button></form></body>');
        res.write('</html>');
        
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        // buffer is like bus stop where bus (chunk of data stream) can be track
        // buffer is a construct which allows you to hold multiple chunks (request header data)
        // and work with them (on the fly) before they are released
        
        // on() allows us to listen to certain events 
        // the data event will be fired whenever a new chunk is ready to be read
        // helping by the buffer thing

        // stream -> req body 1, req body 2, ... -> fully parsed
        // parse -> resolve (a sentence) into its component parts and describe their syntactic roles
        const body = [];

        req.on('data', (chunk) => {
            console.log("Chunk get from the data event: " + chunk);
            body.push(chunk);
        });

        // end event execute after parsing incoming req data from data event
        // here is the bus stop, the buffer for the chunk (bus)
        // the bus (chunk data) is now waiting in the bus stop (buffer)
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("Parsed Body from the end event: " + parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        // write meta info
        // status code : 302 -> redirection
        // res.writeHead(status code, reason, header object);

        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
    }

    res.write('<html>');
    res.write('<head><title>Outside</title></head>');
    res.write('<body><form action="/message" method="Get"><input type="text"/><button type="submit">Click</button></form></body>');
    res.write('</html>');
    res.end();

});

// listen when browser call http://localhost:5000
server.listen(5000);