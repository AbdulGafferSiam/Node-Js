const fs = require('fs');

const requestHandler = (req, res) => {
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
        const body = [];

        req.on('data', (chunk) => {
            console.log("Chunk get from the data event: " + chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("Parsed Body from the end event: " + parsedBody);
            const message = parsedBody.split('=')[1];

            // Asynchronously writes data to a file
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Outside</title></head>');
    res.write('<body><h1>Hello from server!</h1></body>');
    res.write('</html>');
    res.end();
};

// export module
module.exports = requestHandler;

// another way of export
// pointing an object
/*
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}
*/

// another way of export
/*
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text'
*/

// another way of export
/*
exports.handler = requestHandler;
exports.someText = 'Some hard coded text'
*/
