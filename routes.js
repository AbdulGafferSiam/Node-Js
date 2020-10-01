const routeHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body><p>Welcome</p>');
        res.write('<form method=\'POST\' action= \'create-user\'>');
        res.write('<input type=\'text\' name=\'user\' />');
        res.write('<button type=\'submit\'>Send</button>');
        res.write('</body></html>');
        return res.end();
    }

    if (url === '/user') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('</ul>');
        res.write('</body></html>');
        return res.end();
    }

    const user = [];
    
    if(url === '/create-user' && method === 'POST') {
        req.on('data', (data) => {
            user.push(data);
        });
        return req.on('end', () => {
            const parsedData = Buffer.concat(user).toString();
            const name = parsedData.split('=')[1];
            console.log(name);

            res.statusCode = 302;
            res.setHeader('Location', '/user');
            res.end();
        });
    }
}

module.exports = routeHandler;