const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
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
        const body = [];

        req.on('data', (chunk) => {
            console.log("Chunk get from the data event: " + chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("Parsed Body from the end event: " + parsedBody);
            const message = parsedBody.split('=')[1];

            // syncronous code block next code execution untill the file is created
            // it become a problem for big files
            // Synchronously writes data to a file, replacing the file if it already exists
            // fs.writeFileSync('message.txt', message);

            // Asynchronously writes data to a file, replacing the file if it already exists
            // this approach never block the code or server
            fs.writeFile('message.txt', message, (err) => {
                // moved from outer scope
                // this response should only be sent if we're done working with the file
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        // return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Outside</title></head>');
    res.write('<body><h1>Hello from server!</h1></body>');
    res.write('</html>');
    res.end();

});

// listen when browser call http://localhost:5000
server.listen(5000);